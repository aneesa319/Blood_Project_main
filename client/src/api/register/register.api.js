import axios from 'axios';

/**
 * creating the api
 */

const api = axios.create(
    {
        baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5001/api') + '/user'
    }
)

/**
 * sending the verification email
 */

export const sendRegisterVerificationCodeByEmail = async(data)=>{

    const res = await api.post("/registration/verificationCode",JSON.stringify(data),{
        headers:{
            "Content-Type": "application/json"
        }
    });

    console.log("Inside the register Email verification Api",res.data);
    const {code,email,message,status} = res.data;
    return {
        code,
        email,
        message,
        status
    };    
}

export const sendUserDataToBackend = async(data) => {
    const res = await api.post("/auth/register", JSON.stringify(data),{
        headers:{
            "Content-Type": "application/json"
        }
    });

    console.log("Inside the register api user data response",res.data);

    return res.data;
}
