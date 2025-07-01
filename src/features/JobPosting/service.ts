import Client from "../../api";

export const getAllJobs = async () => {
    try{
        const response = new Client().hr.jobpostings.getAllJobs();
        console.log("got data")
        return response;
    }catch(error){
        throw error;
    }
}

 export const createJob = async (data: any) => {
     try{
            const response = new Client().hr.jobpostings.createJob(data);
            return response;
        }catch(error){
            throw error;
        }
    }


export const updateJob = async (data: any, id: any) => {
    console.log("update id",id)
        try{
            const response = new Client().hr.jobpostings.updateJob(id, data);
            return response;
        }catch(error){
            throw error;
        }
    }

export const deleteJob = async (id: any) => {
    try{
        const response = new Client().hr.jobpostings.deleteJob(id);
        return response;
    }catch(error){
        throw error;
    }
}

