import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const likeReducer = createReducer(initialState, {
    likePostRequest: (state) => {
        state.loading = true;
    },
    likePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    likePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },




    addCommentRequest: (state) => {
        state.loading = true;
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    addCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },




    deleteCommentRequest: (state) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    newPostRequest: (state) => {
        state.loading = true;
    },
    newPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },





    deletePostRequest: (state) => {
        state.loading = true;
    },
    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    

    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    updatePasswordRequest: (state) => {
        state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },




    


    updatePostRequest: (state) => {
        state.loading = true;
    },
    updatePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    deleteProfileRequest: (state) => {
        state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    ForgotPasswordRequest: (state) => {
        state.loading = true;
    },
    ForgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    ForgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    followUnfollowRequest: (state) => {
        state.loading = true;
    },
    followUnfollowSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    followUnfollowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    clearErrors: (state) => {
        state.error = null;

    },
    clearMessage: (state) => {
        state.message = null;
    }
}

);


export const MyPostsReducer = createReducer(initialState, {
    getMyPostsRequest: (state) => {
        state.loading = true;
    },
    getMyPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getMyPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    cleatErrors: (state) => {
        state.error = null;
    }
})

export const UserPostReducer = createReducer(initialState, {
    getUserPostsRequest: (state) => {
        state.loading = true;
    },
    getUserPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getUserPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    cleatErrors: (state) => {
        state.error = null;
    }
})


