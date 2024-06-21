import {ApiResponse} from "../utils/apiResponse.js";
import {ApiError} from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {vaultModel} from "../models/vault.model.js";

const options = {
    sameSite: "None",
    httpOnly: true,
    secure: false
}

const createVault = asyncHandler(async (req, res) => {

    const { name, password } = req.body;
    if(!name || !password) throw new ApiError(400, "Some fields are missing");

    const vault = await vaultModel.findOne({user: req.user._id, name});
    if(vault) throw new ApiError(406, "Vault already exists");

    const newVault = await vaultModel.create({
        name,
        password,
        user: req.user._id
    });

    if(!newVault) throw new ApiError(500, "Error creating vault");

    return res
        .status(201)
        .json(new ApiResponse(201, newVault, "Vault created successfully"));

});

const deleteVault = asyncHandler(async (req, res) => {

    const { name } = req.params;
    if(!name) throw new ApiError(400, "name is missing");

    const vault = await vaultModel.findOne({name});
    if(!vault) throw new ApiError(404, "Vault not found");

    if(vault.user.toString() !== req.user._id.toString()) throw new ApiError(401, "This user is not authorized to delete this vault");

    await vaultModel.deleteOne({name});

    return res
        .status(204)
        .json(new ApiResponse(204, {}, "Vault deleted successfully"));

});

const getVaultData = asyncHandler(async (req, res) => {

    const { name, password } = req.body;
    if(!name || !password) throw new ApiError(400, "Some fields are missing");

    const vault = await vaultModel.findOne({name, user: req.user._id});
    if(!vault) throw new ApiError(404, "Vault not found");

    if(await vault.comparePassword(password, vault.password) === false) throw new ApiError(401, "Wrong Password");

    const vaultData = await vaultModel.aggregate([
        {
            $match: {
                name: name
            }
        },
        {
            $lookup: {
                from: "datas",
                localField: "_id",
                foreignField: "vault",
                as: "vaultData",
            }
        },
        {
            $project: {
                "vaultData": 1
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, vaultData[0], "Vault data fetched successfully"));

});

export {
    createVault,
    deleteVault,
    getVaultData,
}