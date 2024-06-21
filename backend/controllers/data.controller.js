import {ApiResponse} from "../utils/apiResponse.js";
import {ApiError} from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {vaultModel} from "../models/vault.model.js";
import {dataModel} from "../models/data.model.js";

const options = {
    sameSite: "None",
    httpOnly: true,
    secure: false
}

const addData = asyncHandler(async (req, res) => {

    const {vaultId, credentialType, credential, name} = req.body;
    if([vaultId, credentialType, credential, name].some((field) => field?.trim() === '' || !field)) throw new ApiError(400, "Some fields are missing");

    if(!["password", "key", "notes", "others"].some((field) => field?.trim() === credentialType.trim())) throw new ApiError(400, "Invalid credential type");

    const vault = await vaultModel.findById(vaultId);
    if(!vault) throw new ApiError(401, "Vault does not exist");

    const newData = await dataModel.create({
        vault: vaultId,
        credentialType,
        credential,
        name
    });

    return res
        .status(201)
        .json(new ApiResponse(201, newData, "Vault data created successfully"));

});

export {
    addData
}