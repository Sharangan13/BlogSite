import axios from 'axios';
import { adminDeleteUserFail, adminDeleteUserSuccess, adminGetUsersDetailsFail, adminGetUsersDetailsRequest, adminGetUsersDetailsSuccess } from "../slices/UsersSlice";
import {adminUpdateUserDetailFail, adminUpdateUserDetailRequest, adminUpdateUserDetailSuccess, getUserFail, getUserRequest, getUserSuccess } from '../slices/UserSlice';

export const adminGetUsersDetails = (keyword, id) => async (dispatch) => {

    let link = '/api/sh/admin/users';
    if (keyword) {
        link += `?&keyword=${keyword}`;
    }

    try {

        dispatch(adminGetUsersDetailsRequest());
        const {data} = await axios.get(link);

        dispatch(adminGetUsersDetailsSuccess(data));
       
    } catch (error) {
        
        dispatch(adminGetUsersDetailsFail(error.response.data.message));
    }
};

export const AdminDeleteUser = id => async (dispatch) => {

    try {  
        dispatch(adminGetUsersDetailsRequest()) 
        await axios.delete(`/api/sh/admin/user/${id}`);
        dispatch(adminDeleteUserSuccess())
    } catch (error) {
        dispatch(adminDeleteUserFail(error.response.data.message))
    }
    
}


export const AdminUpdateUserDetails = (id,userData) => async (dispatch) => {


    try {
        dispatch(adminUpdateUserDetailRequest())

        const { data }  = await axios.put(`/api/sh/admin/user/${id}`,userData);
        dispatch(adminUpdateUserDetailSuccess(data))
    } catch (error) {
        dispatch(adminUpdateUserDetailFail(error.response.data.message))
    }

}


export const getUser = (id) => async (dispatch) => {

    try {  
        dispatch(getUserRequest()) 
        const { data }  =  await axios.get(`/api/sh/admin/user/${id}`);
        dispatch(getUserSuccess(data))
    } catch (error) {
        
        dispatch(getUserFail(error.response.data.message))
    }
    
}
