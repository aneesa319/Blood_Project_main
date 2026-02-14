import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRegisterVerificationCodeByEmail, sendUserDataToBackend } from "../../api/register/register.api";

// create async function for registration a user using the verification code through email
export const sendVerificationCodeForRegistration = createAsyncThunk("verificationCode", async(email, {rejectWithValue}) => {

    try {

        const res = await sendRegisterVerificationCodeByEmail(email);
        console.log("data after response in registeration through verification code",res);
        return res;

    } catch (error) {
        console.log("error is sendRegisterVerificationCodeByEmail: ",error);
        return rejectWithValue(error);
    }
})

// create async function for registeration and send data to the backend
export const sendUserDataThroughRedux = createAsyncThunk("user/data",async(data,{rejectWithValue}) => {
    try {
        const res = await sendUserDataToBackend(data);
        console.log("data after response in registeration user data",res);
        return res;

    } catch (error) {
        console.log("error is in sending user data to the backend:",error);
        return rejectWithValue(error);
    }
})

const initialState = {
    email: '',
    isLoading: false,
    isError: false,
    msg: '',
    verificationCode: '',
    status: null
}

const registerSlice = createSlice(
    {
        name:'Register',
        initialState: initialState,
        reducers:{
            updateStatus: (state, action) => {
                console.log("action payload in update status",action.payload)
                state.status = action.payload;
            },
            setEmailDirectly: (state, action) => {
                state.email = action.payload;
            }
        },
        extraReducers: (builder) => {
            /**
             * Registration
             */
            // 1. verification code by email
            builder
            .addCase(sendVerificationCodeForRegistration.pending,(state) => {
                state.isLoading = true
            })
            .addCase(sendVerificationCodeForRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
                const { code, email, message, status } = action.payload || {};

                state.verificationCode = code ?? ""; 
                state.email = email ?? "";
                state.status = status ?? "";
                state.msg = message ?? "";

                console.log("action.payload: fulfilled status", action.payload);
            })
            .addCase(sendVerificationCodeForRegistration.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.error?.message || "Something went wrong during verification.";
                console.log("action.payload in rejected status", action.payload);
            })
            // 2. registering the user finally
            .addCase(sendUserDataThroughRedux.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(sendUserDataThroughRedux.fulfilled,(state,action) => {
                console.log("action.payload in user data",action.payload);
                state.verificationCode = "";
                state.email = "";
                state.isLoading = false;
                state.msg = "";
                state.isError = false;
                state.status = null
            })
            .addCase(sendUserDataThroughRedux.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.error?.message || "User registration failed.";
                console.log("action.payload in user registration rejected", action.payload);
            })
        }
    }
)


export const { updateStatus, setEmailDirectly } = registerSlice.actions;
export default registerSlice.reducer;