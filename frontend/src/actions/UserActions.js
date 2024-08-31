import { clearError, clearUpdatedState, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, loadUserFail, loadUserRequest, loadUserSuccess, logOutFail, logOutSuccess, loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../slices/AuthSlice";
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const { data }  = await axios.post(`/api/sh/login`,{email,password});
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }

}


export const clearAuthError=(dispatch)=>{
    dispatch(clearError())

}

export const updatedStateAsFalse=(dispatch)=>{
    dispatch(clearUpdatedState())

}



export const register = (userData) => async (dispatch) => {


    try {
        dispatch(registerRequest())

        const config = {
            headers:{
            "Content-type":"multipart/form-data"
        }
    }

        const { data }  = await axios.post(`/api/sh/register`,userData,config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}



export const loadUser = async (dispatch) => {

    

    try {
        dispatch(loadUserRequest())

        const config = {
            headers:{
            "Content-type":"multipart/form-data"
        }
    }

        const { data }  = await axios.get(`/api/sh/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }

}


// Logout action
export const logOut = async (dispatch) => {

    try {
        const { data }  = await axios.get(`/api/sh/logout`);
        dispatch(logOutSuccess())
    } catch (error) {
        dispatch(logOutFail(error.response.data.message))
    }

}


export const updateProfile = (userData) => async (dispatch) => {


    try {
        dispatch(updateProfileRequest())

        const config = {
            headers:{
            "Content-type":"multipart/form-data"
        }
    }

        const { data }  = await axios.put(`/api/sh/update`,userData,config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}


export const updatePassword = (formData) => async (dispatch) => {


    try {
        dispatch(updatePasswordRequest())

        const config = {
            headers:{
            "Content-type":"application/json"
        }
    }

        await axios.put(`/api/sh/password/change`,formData,config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }

}



export const forgotPassword = (formData) => async (dispatch) => {


    try {
        dispatch(forgotPasswordRequest())

        const config = {
            headers:{
            "Content-type":"application/json"
        }
    }

       const {data} = await axios.post(`/api/sh/password/forgot`,formData,config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}


export const resetPassword = (formData,token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())

        const config = {
            headers:{
            "Content-type":"application/json"
        }
    }

       const {data} = await axios.post(`/api/sh/password/reset/${token}`,formData,config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}