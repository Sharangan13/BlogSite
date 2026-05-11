import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'usersDetail',
    initialState: {
        loading: false,
        isAdminDeleteUser: false,
        users: [],
    },
    reducers: {
        adminGetUsersDetailsRequest(state) {
            return { ...state, loading: true };
        },
        adminGetUsersDetailsSuccess(state, action) {
            return { ...state, loading: false, users: action.payload.users };
        },
        adminGetUsersDetailsFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
        clearError(state) {
            return { ...state, error: null };
        },
        adminDeleteUserRequest(state) {
            return { ...state, loading: true };
        },
        adminDeleteUserSuccess(state) {
            return { ...state, loading: false, isAdminDeleteUser: true };
        },
        adminDeleteUserFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
        isAdminDeleteUserClear(state) {
            return { ...state, isAdminDeleteUser: false };
        },
    },
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
    isAdminDeleteUserClear,
} = actions;
export default reducer;
