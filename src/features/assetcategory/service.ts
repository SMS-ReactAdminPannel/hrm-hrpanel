
import Client from "../../api";


export const createassetcategory = async (data: any) => {
  try {
    const response = await new Client().hr.assetcategory.createassetcategory(data);
    return response;
  } catch (error) {
    console.log("Error in createasset", error);
  }
};


export const getassetcategory = async (assetId: string,data:any) => {
  try {
    const response = await new Client().hr.assetcategory.getassetcategory(assetId,data);
    return response;
  } catch (error) {
    console.log("Error in getasset", error);
  }
};

export const getallassetcategory = async () => {
  try {
    const response = await new Client().hr.assetcategory.getallassetcategory();
    return response;
  } catch (error) {
    console.log("Error in getAllasset", error);
  }
};


export const updateassetcategory = async (assetId: string, data:any) => {
  try {
    const response = await new Client().hr.assetcategory.updateassetcategory(assetId, data);
    return response;
  } catch (error) {
    console.error("Error in updateasset", error);
    throw error;
  }
};

  export const deleteassetcategory = async (assetId: string) => {
  try {
    const response = await new Client().hr.assetcategory.deleteassetcategory(assetId);
    return response;
  } catch (error) {
    console.error("Error in deleteasset", error);
    throw error;
  }

};



export const createAsset = async (data: any) => {
  try {
    const response = await new Client().hr.asset.assetcreate(data);
    return response;
  } catch (error) {
    console.log("Error in createAsset", error);
  }
};

export const getAssetById = async (assetId: string,data:any) => {
  try {
    const response = await new Client().hr.asset.assetget(assetId,data);
    return response;
  } catch (error) {
    console.log("Error in getAssetById", error);
  }
};

export const getAllAssets = async () => {
  try {
    const response = await new Client().hr.asset.assetgetall();
    return response;
  } catch (error) {
    console.log("Error in getAllAssets", error);
  }
};

export const updateAsset = async (assetId: string, data: any) => {
  try {
    const response = await new Client().hr.asset.assetupdate(assetId, data);
    return response;
  } catch (error) {
    console.error("Error in updateAsset", error);
    throw error;
  }
};

export const deleteAsset = async (assetId: string) => {
  try {
    const response = await new Client().hr.asset.assetdelete(assetId);
    return response;
  } catch (error) {
    console.error("Error in deleteAsset", error);
    throw error;
  }
};
