import axios from 'axios';
import {
    clearError,
    clearUpdatedState,
    forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess,
    loadUserFail, loadUserRequest, loadUserSuccess,
    logOutFail, logOutSuccess,
    loginFail, loginRequest, loginSuccess,
    registerFail, registerRequest, registerSuccess,
    resetPasswordFail, resetPasswordRequest, resetPasswordSuccess,
    updatePasswordFail, updatePasswordRequest, updatePasswordSuccess,
    updateProfileFail, updateProfileRequest, updateProfileSuccess,
} from '../slices/AuthSlice';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post('/api/sh/login', { email, password });
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response?.data?.message || 'Login failed'));
    }
};

// These are thunks so they can be dispatched directly
export const clearAuthError = (dispatch) => { dispatch(clearError()); };
export const updatedStateAsFalse = (dispatch) => { dispatch(clearUpdatedState()); };

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const { data } = await axios.post('/api/sh/register', userData, {
            headers: { 'Content-type': 'multipart/form-data' },
        });
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response?.data?.message || 'Registration failed'));
    }
};

export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get('/api/sh/myprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response?.data?.message || 'Not logged in'));
    }
};

export const logOut = async (dispatch) => {
    try {
        await axios.get('/api/sh/logout');
        dispatch(logOutSuccess());
    } catch (error) {
        dispatch(logOutFail(error.response?.data?.message || 'Logout failed'));
    }
};

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const { data } = await axios.put('/api/sh/update', userData, {
            headers: { 'Content-type': 'multipart/form-data' },
        });
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail(error.response?.data?.message || 'Update failed'));
    }
};

export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        await axios.put('/api/sh/password/change', formData, {
            headers: { 'Content-type': 'application/json' },
        });
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail(error.response?.data?.message || 'Password change failed'));
    }
};

export const forgotPassword = (formData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const { data } = await axios.post('/api/sh/password/forgot', formData, {
            headers: { 'Content-type': 'application/json' },
        });
        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response?.data?.message || 'Failed to send email'));
    }
};

export const resetPassword = (formData, token) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const { data } = await axios.post(`/api/sh/password/reset/${token}`, formData, {
            headers: { 'Content-type': 'application/json' },
        });
        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        dispatch(resetPasswordFail(error.response?.data?.message || 'Reset failed'));
    }
};
