import axios from 'axios';
import {
    adminDeleteUserFail,
    adminDeleteUserRequest,
    adminDeleteUserSuccess,
    adminGetUsersDetailsFail,
    adminGetUsersDetailsRequest,
    adminGetUsersDetailsSuccess,
    clearError,
} from '../slices/UsersSlice';
import {
    adminUpdateUserDetailFail,
    adminUpdateUserDetailRequest,
    adminUpdateUserDetailSuccess,
    getUserFail,
    getUserRequest,
    getUserSuccess,
} from '../slices/UserSlice';

export const adminGetUsersDetails = (keyword) => async (dispatch) => {
    let link = '/api/sh/admin/users';
    if (keyword) link += `?keyword=${keyword}`;
    try {
        dispatch(adminGetUsersDetailsRequest());
        const { data } = await axios.get(link);
        dispatch(adminGetUsersDetailsSuccess(data));
    } catch (error) {
        dispatch(adminGetUsersDetailsFail(error.response?.data?.message || 'Failed to fetch users'));
    }
};

export const AdminDeleteUser = (id) => async (dispatch) => {
    try {
        dispatch(adminDeleteUserRequest());
        await axios.delete(`/api/sh/admin/user/${id}`);
        dispatch(adminDeleteUserSuccess());
    } catch (error) {
        dispatch(adminDeleteUserFail(error.response?.data?.message || 'Failed to delete user'));
    }
};

export const AdminUpdateUserDetails = (id, userData) => async (dispatch) => {
    try {
        dispatch(adminUpdateUserDetailRequest());
        const { data } = await axios.put(`/api/sh/admin/user/${id}`, userData);
        dispatch(adminUpdateUserDetailSuccess(data));
    } catch (error) {
        dispatch(adminUpdateUserDetailFail(error.response?.data?.message || 'Failed to update user'));
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch(getUserRequest());
        const { data } = await axios.get(`/api/sh/admin/user/${id}`);
        dispatch(getUserSuccess(data));
    } catch (error) {
        dispatch(getUserFail(error.response?.data?.message || 'Failed to fetch user'));
    }
};
