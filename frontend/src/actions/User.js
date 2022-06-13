import axios from 'axios'


// <-- for login a user -->
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })


        const { data } = await axios.post(
            '/api/v1/login',
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });

        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });



    } catch (error) {

        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message
        });

    }
}




// <-- for logOut a User -->
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutRequest",
        })

        await axios.get('/api/v1/logout');  // change

        dispatch({
            type: "LogoutSuccess"

        })

    } catch (error) {
        dispatch({
            type: "LogoutFailure",
            payload: error.response.data.message
        })
    }
}



// <-- for loading a user -->

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        });

        const { data } = await axios.get("/api/v1/me"); // change 


        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });



    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        })
    }

}




// <-- for getting the posts of the following -->
export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: " PostOfFollowingRequest",
        })

        const { data } = await axios.get('/api/v1/posts'); // change

        dispatch({
            type: "PostOfFollowingSuccess",
            payload: data.posts,
        })

    } catch (error) {

        dispatch({
            type: "PostOfFollowingFailure",
            payload: error.response.data.message,
        })

    }
}


// <-- for getting all the users -->
export const getAllUsers = (name="") => async (dispatch) => {
    try {

        dispatch({
            type: "getAllUsersRequest"
        })

        const { data } = await axios.get(`/api/v1/users?name=${name}`);  // change
        console.log(data);
        dispatch({
            type: "getAllUsersSuccess",
            payload: data.users,

        })

    } catch (error) {
        dispatch({
            type: "getAllusersFailure",
            payload: error.response.data.message,
        })
    }
}




// <-- for getting all the Posts of Login User (MY posts) -->
export const getMyPosts = () => async (dispatch) => {
    try {

        dispatch({
            type: "getMyPostsRequest",
        });

        const { data } = await axios.get(`/api/v1/my/posts`); //change

        dispatch({
            type: "getMyPostsSuccess",
            payload: data.posts,
        })


    } catch (error) {
        dispatch({
            type: "getMyPostsFailure",
            payload: error.response.data.message

        });

    }
}


// <-- for register a new user -->

export const registerUser = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest"
        });

        const { data } = await axios.post('/api/v1/register',  // change
            { name, email, password, avatar },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message

        });

    }
}


// <-- for updating the profile of a user -->
export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        })

        const { data } = await axios.put('/api/v1/update/profile',  // change
            { name, email, avatar },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        })


    } catch (error) {

        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message
        })
    }
}

// <-- for updating the profile of a user -->
export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePasswordRequest"
        })

        const { data } = await axios.put('/api/v1/update/password',  // change
            { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message
        })


    } catch (error) {

        dispatch({
            type: "updatePasswordFailure",
            payload: error.response.data.message
        })
    }
}



// <-- for deleting profile of a user (login) -->
export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest"
        })

        const { data } = await axios.delete('/api/v1/delete/me') // change  );

        dispatch({
            type: "deleteProfileSuccess",
            payload: data.message
        })


    } catch (error) {

        dispatch({
            type: "deleteProfileFailure",
            payload: error.response.data.message
        })
    }




}



// <-- for setting new password for a user (login)/ resseting password throug token -->
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "ForgotPasswordRequest",
        })

        const { data } = await axios.post('/api/v1/forgot/password',
            { email },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ); // change  );

        dispatch({
            type: "ForgotPasswordSuccess",
            payload: data.message,
        })


    } catch (error) {

        dispatch({
            type: "ForgotPasswordFailure",
            payload: error.response.data.message
        })
    }
}

// <-- for setting new password for a user (login)/ resseting password throug token -->
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest",
        })

        const { data } = await axios.put(`/api/v1/password/reset/${token}`,
            { password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ); // change  );

        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message,
        })


    } catch (error) {

        dispatch({
            type: "resetPasswordFailure",
            payload: error.response.data.message
        })
    }
}



// <-- for getting all the Posts of User (Users posts) -->
export const getUserPosts = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "getUserPostsRequest",
        });

        const { data } = await axios.get(`/api/v1/userposts/${id}`); //change

        dispatch({
            type: "getUserPostsSuccess",
            payload: data.posts,
        })


    } catch (error) {
        dispatch({
            type: "getUserPostsFailure",
            payload: error.response.data.message

        });

    }
}




// <-- for profile of User (User) -->
export const getUserProfile = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "userProfileRequest",
        });

        const { data } = await axios.get(`/api/v1/user/${id}`); //change

        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        })


    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message

        });

    }
}



// <-- for profile of User (User) -->
export const followUnfollowUser = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "followUnfollowRequest",
        });

        const { data } = await axios.get(`/api/v1/follow/${id}`); //change

        dispatch({
            type: "followUnfollowSuccess",
            payload: data.message,
        })


    } catch (error) {
        dispatch({
            type: "followUnfollowFailure",
            payload: error.response.data.message

        });

    }
}