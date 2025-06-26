import Client from "../../api"

export const postLogin = async(data:any)=>{
    try{
const response= await  Client.hr.hrprofile.postlogin(data)

 return response;
    }
    catch (error){
console.log('Error fetching data:',error);
    }
}

export const postSignup = async (data: any) => {
  try {
    const response = await Client.hr.hrprofile.postregister(data);
    return response;
  } catch (error) {
    console.log("Error during signup:", error);
    throw error; 
  }
};


export const postLogout = async () => {
  try {
    const response = await Client.hr.hrprofile.postlogout();
    return response;
  } catch (error) {
    console.log("Error during logout:", error);
    throw error;
  }
};
