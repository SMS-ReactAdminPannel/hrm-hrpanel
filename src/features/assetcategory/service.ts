
import Client from "../../api";


export const createasset = async (data: any) => {
  try {
    const response = await new Client().hr.asset.createasset(data);
    return response;
  } catch (error) {
    console.log("Error in createasset", error);
  }
};


export const getasset = async (assetId: string) => {
  try {
    const response = await new Client().hr.asset.getasset(assetId);
    return response;
  } catch (error) {
    console.log("Error in getasset", error);
  }
};

export const getallasset = async () => {
  try {
    const response = await new Client().hr.asset.getallasset();
    return response;
  } catch (error) {
    console.log("Error in getAllasset", error);
  }
};


export const updateasset = async (assetId: string, data:any) => {
  try {
    const response = await new Client().hr.asset.updateasset(assetId, data);
    return response;
  } catch (error) {
    console.error("Error in updateasset", error);
    throw error;
  }
};

  export const deleteasset = async (assetId: string) => {
  try {
    const response = await new Client().hr.asset.deleteasset(assetId);
    return response;
  } catch (error) {
    console.error("Error in deleteasset", error);
    throw error;
  }

};



export const createAssetcategory = async (data: any) => {
  try {
    const response = await new Client().hr.assetcategory.createassetcategory(data);
    return response;
  } catch (error) {
    console.log("Error in createAsset", error);
  }
};

export const getAssetcategoryById = async (assetId: string) => {
  try {
    const response = await new Client().hr.assetcategory.getassetcategory(assetId);
    return response;
  } catch (error) {
    console.log("Error in getAssetById", error);
  }
};

export const getAllAssetcategory = async () => {
  try {
    const response = await new Client().hr.assetcategory.getallassetcategory();
    return response;
  } catch (error) {
    console.log("Error in getAllAssets", error);
  }
};

export const updateAssetcategory = async (assetId: string, data: any) => {
  try {
    const response = await new Client().hr.assetcategory.updateassetcategory(assetId, data);
    return response;
  } catch (error) {
    console.error("Error in updateAsset", error);
    throw error;
  }
};

export const deleteAssetcategory = async (assetId: string) => {
  try {
    const response = await new Client().hr.assetcategory.deleteassetcategory(assetId);
    return response;
  } catch (error) {
    console.error("Error in deleteAsset", error);
    throw error;
  }
};
