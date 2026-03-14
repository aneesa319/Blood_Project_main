import API from "../axiosInstance";

export const postBloodRequirement = async (requestData) => {
  try {
    const response = await API.post("/blood-request/create", requestData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to post blood requirement");
  }
};

export const getMyBloodRequirements = async (patientId) => {
  try {
    const response = await API.get(`/blood-request/my-requests/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch blood requirements");
  }
};

export const getAllBloodRequirements = async (city = "") => {
  try {
    const response = await API.get(`/blood-request/all?city=${city}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch all blood requirements");
  }
};
