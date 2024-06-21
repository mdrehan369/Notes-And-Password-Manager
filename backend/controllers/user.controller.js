import {ApiResponse} from "../utils/apiResponse.js";
import {ApiError} from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {userModel} from "../models/user.model.js";
import mongoose from "mongoose";

const options = {
    sameSite: "None",
    httpOnly: true,
    secure: false
}

const login = asyncHandler(async (req, res) => {

    const {emailOrUsername, password} = req.body;

    if(!emailOrUsername || !password) throw new ApiError(400, "Some fields are missing");

    const user = await userModel.findOne({
        $or: [{username: emailOrUsername}, {email: emailOrUsername}]
    });

    if(!user) throw new ApiError(404, "User not found");

    if(await user.comparePassword(password) === false) throw new ApiError(401, "Password must match");

    const accessToken = user.generateAccessToken();

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, user, "User Logged Successfully"));

});

const signup = asyncHandler(async (req, res) => {

    const {username, name, email, password} = req.body;

    if([username, email, name, password].some(field => field?.trim() === "" || !field)) throw new ApiError(404, "Some fields are missing");

    const user = await userModel.findOne({
        $or: [{username}, {email}]
    });

    if(user) throw new ApiError(406, "User already exists");

    const newUser = await userModel.create({
        username,
        password,
        email,
        name
    });

    if(!newUser) throw new ApiError(500, "Error while creating user");

    const accessToken = newUser.generateAccessToken();

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(201, user, "User created successfully"));

});

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));

});

const deleteUser = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    if(!userId) throw new ApiError(404, "User does not exist");

    await userModel.deleteOne({_id: userId});

    return res
    .status(204)
    .clearCookie("accessToken")
    .json(new ApiResponse(204, {}, "User deleted successfully"));

});

const logout = asyncHandler(async (req, res) => {

    return res
        .status(202)
        .clearCookie("accessToken")
        .json(new ApiResponse(202, {}, "User logged out"));

})

const getAllVaults = asyncHandler(async (req, res) => {

    const vaults = await userModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            }
        },
        {
            $lookup: {
                from: "vaults",
                localField: "_id",
                foreignField: "user",
                as: "allVaults",
                pipeline: [
                    {
                        $project: {
                            'password': 0
                        }
                    }
                ]
            }
        },
        {
            $project: {
                "allVaults": 1
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, vaults[0], "All vaults fetched successfully"));

});

export {
    login,
    signup,
    getCurrentUser,
    deleteUser,
    getAllVaults,
    logout
}