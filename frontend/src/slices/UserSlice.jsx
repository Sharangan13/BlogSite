import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'userDetails',
    initialState: {
        loading: false,
        isAdminUpdateUser:false,
        user:{},
       
    },
    reducers: {

        getUserRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        getUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                
            }
        },
        getUserFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

        adminUpdateUserDetailRequest(state,action){
            return{
                ...state,
                loading: true,
            }
        },
        adminUpdateUserDetailSuccess(state,action){
            return{
                ...state,
                loading: false,
                user: action.payload.user,
                isAdminUpdateUser:true,
            }
        },
        adminUpdateUserDetailFail(state,action){
            return{
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        adminUpdateUserDetailClear(state,action){
            return{
                ...state,
                isAdminUpdateUser:false,
            }
        },

        clearError(state, action){
            return {
                ...state,
                error: null
            }
        }
       
    }
});

const { actions, reducer } = userSlice;

export const { 

    adminUpdateUserDetailRequest,
    adminUpdateUserDetailSuccess,
    adminUpdateUserDetailFail,
    adminUpdateUserDetailClear,
    clearError,

    getUserRequest,
    getUserSuccess,
    getUserFail

} = actions;

export default reducer;