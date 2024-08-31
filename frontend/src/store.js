import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slices/BlogsSlice";
import blogReducer from "./slices/BlogSlice";
import authReducer from "./slices/AuthSlice";
import usersState from "./slices/UsersSlice";
import userState from "./slices/UserSlice";
import myblogsState from "./slices/MyBlogsSlice";



const reducer = combineReducers({
    blogsState:blogsReducer,
    blogState:blogReducer,
    authState:authReducer,
    usersState:usersState,
    userState:userState,
    myblogsState:myblogsState




})


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;
