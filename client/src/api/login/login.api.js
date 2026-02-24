import axios from "axios";

const api = axios.create(
    {
        baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5001/api') + '/user'
    }
)

/**
 * sending the login data of a user to the database
 */

export const sendUserLoginDataAPI = async (data) => {
    try {
        const res = await api.post("/auth/login",JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log("res in send user Login Api",res.data);
        return res.data;
    } catch (error) {
        console.log("error in send user login:",error.response.data);
        return error.response.data;
    }

}