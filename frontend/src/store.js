import { configureStore } from "@reduxjs/toolkit";
import { userReducer, postReducer,getAllUsersReducer, userProfileReducer, } from "./reducers/UserReducer";
import { likeReducer,MyPostsReducer,UserPostReducer } from "./reducers/PostReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        postsOfFollowing:postReducer,
        allUsers:getAllUsersReducer,
        likePost:likeReducer,
        MyPosts:MyPostsReducer,
        userProfile:userProfileReducer,
        userPosts:UserPostReducer,
    }
});

export default store;