
import Client from "../../api";


export const createasset = async (data: any) => {
  try {
    const response = await new Client().hr.assetcategory.createasset(data);
    return response;
  } catch (error) {
    console.log("Error in createasset", error);
  }
};


export const getasset = async (assetId: string,data:any) => {
  try {
    const response = await new Client().hr.assetcategory.getasset(assetId,data);
    return response;
  } catch (error) {
    console.log("Error in getasset", error);
  }
};

export const getallasset = async () => {
  try {
    const response = await new Client().hr.assetcategory.getallasset();
    return response;
  } catch (error) {
    console.log("Error in getAllasset", error);
  }
};


export const updateasset = async (assetId: string, data:any) => {
  try {
    const response = await new Client().hr.assetcategory.updateasset(assetId, data);
    return response;
  } catch (error) {
    console.error("Error in updateasset", error);
    throw error;
  }
};

  export const deleteasset = async (assetId: string) => {
  try {
    const response = await new Client().hr.assetcategory.deleteasset(assetId);
    return response;
  } catch (error) {
    console.error("Error in deleteasset", error);
    throw error;
  }

};