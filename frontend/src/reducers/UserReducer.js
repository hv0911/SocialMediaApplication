import { createReducer } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false }

export const userReducer = createReducer(initialState, {

    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },


    LogoutRequest: (state) => {
        state.loading = true;
    },
    LogoutSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },



    RegisterRequest: (state) => {
        state.loading = true;

    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },



    LoadUserRequest: (state) => {

        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },


});

export const postReducer = createReducer(initialState, {
    PostOfFollowingRequest: (state) => {
        state.loading = true
    },
    PostOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    PostOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }

});

export const getAllUsersReducer = createReducer(initialState, {
    getAllUsersRequest: (state, action) => {
        state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    getAllusersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})



export const userProfileReducer = createReducer(initialState, {
    userProfileRequest: (state, action) => {
        state.loading = true;
    },
    userProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})





