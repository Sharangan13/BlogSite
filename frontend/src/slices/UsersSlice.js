import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: 'usersDetail',
    initialState: {
        loading: true,
        isAdminDeleteUser:false,
        isAdminUpdateUser:false,
        users:{},
       
    },
    reducers: {

        adminGetUsersDetailsRequest(state, action){
            return {
                loading: true
            }
        },
        adminGetUsersDetailsSuccess(state, action){
            return {
                loading: false,
                users: action.payload.users,
                
            }
        },
        adminGetUsersDetailsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error: null
            }
        },

        adminDeleteUserRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        adminDeleteUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAdminDeleteUser:true
                
                
            }
        },
        adminDeleteUserFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

        isAdminDeleteUserClear(state, action){
            return {
                ...state,
                isAdminDeleteUser:false,
                

            }
        }
       
    }
});

const { actions, reducer } = usersSlice;

export const { 
    adminGetUsersDetailsRequest,
    adminGetUsersDetailsSuccess,
    adminGetUsersDetailsFail,
    clearError,

    adminDeleteUserRequest,
    adminDeleteUserSuccess,
    adminDeleteUserFail,
    isAdminDeleteUserClear

} = actions;

export default reducer;