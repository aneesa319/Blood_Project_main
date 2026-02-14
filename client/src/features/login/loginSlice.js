import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendUserLoginDataAPI } from "../../api/login/login.api";

// Async thunk for login
export const sendLoginDataUsingRedux = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
    try {
        const res = await sendUserLoginDataAPI(data);
        return res;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    id: localStorage.getItem("userId") || "",
    role: localStorage.getItem("userRole") || "",
    token: localStorage.getItem("userToken") || "",
    name:"",
    city:"",
    bloodGroup:"",
    patientData:{
        donorsForPatient: [],
        currentPage: null,
        totalPages: null, 
        totalDonors: null, 
        totalCompatibleDonors: null,
        totalEligibleDonors: null,
    },
    isLoading: false,
    isError: false

};

const loginLogoutSlice = createSlice({
    name: 'LoginLogout',
    initialState,
    reducers: {
        logout: (state) => {
            state.id = "";
            state.role = "";
            state.token = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendLoginDataUsingRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendLoginDataUsingRedux.fulfilled, (state, action) => {
                state.isLoading = false;
                const { id, role, token, donorData, name, bloodGroup, city } = action.payload;
            
                state.id = id;
                state.role = role;
                state.token = token;
                state.name = name;
                state.bloodGroup = bloodGroup
                state.city = city
            
                // Set donor data if the logged-in user is a patient
                if (role === 'patient' && donorData) {
                    state.patientData.donorsForPatient = donorData.donors || [];
                    state.patientData.currentPage = donorData.currentPage || 1;
                    state.patientData.totalPages = donorData.totalPages || 1;
                    state.patientData.totalDonors = donorData.totalDonors || 0;
                    state.patientData.totalCompatibleDonors = donorData.totalCompatibleDonors || 0;
                    state.patientData.totalEligibleDonors = donorData.totalEligibleDonors || 0;
                }
                
            
                // Store in localStorage
                if (token) {
                    localStorage.setItem("userId", id);
                    localStorage.setItem("userRole", role);
                    localStorage.setItem("userToken", token);
                }
            })            
            .addCase(sendLoginDataUsingRedux.rejected, (state, action) => {
                state.isError = true;
                console.log("action.payload in rejected case:", action.payload);
            });
    }
});

export const { logout } = loginLogoutSlice.actions;
export default loginLogoutSlice.reducer;