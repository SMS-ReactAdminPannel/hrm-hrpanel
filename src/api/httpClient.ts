import axios from "axios";


 const backEndUrl: string = 'http://localhost:3002'
const Axios = axios.create({
    baseURL:backEndUrl,
    timeout:10000000,
    headers:{
        "Content-Type":"application/json",
    }

});

Axios.interceptors.request.use((config)=> {
    const token =localStorage.getItem("authToken");
    
    if(token){
        config.headers["Authorization"] = `${token ? token :""}`;
    }
    return config;
});

Axios.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if (error?.response && error?.response?.status === 401 && error?.response?.data?.status === "session_expired") {
            localStorage.removeItem("authToken")
        }
    }
)

class HttpClient{
    async get(url:string,params?:string){
    const response:unknown = await Axios.get(url,{
        params:params,
        headers:{

        }
        
    })
    return response;
    }

    async post(url:string,data:any){
        const response:unknown =  await Axios.post(url,data,{
          
            headers:{

            }
        });
        return response;
    }

  async update(url:string,data:string,params?:string){

    const response =await Axios.put(url,data,{
        params:params,
        headers:{

        }
         
    });
    return response?.data;
  }

  async delete(url:string){

    const response = await Axios.delete(url,)
    return response?.data;
  }

  async fileGet(url:string){
    const response= Axios.get(url,{
        responseType:"blob",
        headers:{

        }
    })
    return response;
  }
}

export default  new HttpClient();