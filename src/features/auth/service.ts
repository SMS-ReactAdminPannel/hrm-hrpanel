import Client from "../../api"

export const postLogin = async(data:any)=>{
    try{
const response= await  new Client().hr.hrprofile.postlogin(data)
      // console.log(response.data.token);
      localStorage.setItem("authToken",response.data.token);
      localStorage.setItem("userEmail",response.data.email);
 return response;
    }
    catch (error){
console.log('Error fetching data:',error);
    }
}

export const postSignup = async (data: any) => {
  try {
    const response = await new Client().hr.hrprofile.postregister(data);
    return response;
  } catch (error) {
    console.log("Error during signup:", error);
    throw error; 
  }
};


export const postLogout = async () => {
  try {
    const response = await new Client().hr.hrprofile.postlogout();
    return response;
  } catch (error) {
    console.log("Error during logout:", error);
    throw error;
  }
};

export const validateOtp = async (data: any) => {
  try{
    const response = await new Client().hr.hrprofile.validateOtp(data);
    return response;
  }catch(error){
    console.log("Error during validate otp:", error);
    throw error;
  }
}

export const forgotPassword = async (data: any) => {
  try{
     const response = await new Client().hr.hrprofile.forgotPassword(data);
     return response;
  }catch(error){
     console.log("Error during forgot password:", error);
     throw error;
  }
}

export const resetPassword = async (data: any) => {
  try{
     const response = await new Client().hr.hrprofile.resetPassword(data);
     return response;
  }catch(error){
     console.log("Error during reset password:", error);
     throw error;
  }
}