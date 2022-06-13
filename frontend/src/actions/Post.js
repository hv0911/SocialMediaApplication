import axios from "axios";


// <-- for like and dislike a post -->
export const likeDislikePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likePostRequest",

        })

        const { data } = await axios.get(`/api/v1/post/${id}`)

        dispatch({
            type: "likePostSuccess",
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: "likePostFailure",
            payload: error.response.data.message
        })
    }
}

// <-- for adding a comment on Post -->
export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        })

        const { data } = await axios.put(`api/v1/post/comment/${id}`,
            {
                comment
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })

        dispatch({
            type: "addCommentSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "addCommentFailure",
            payload: error.response.data.message
        })
    }
}


// <-- for deleting a post -->
export const deleteUsersComment = (id, commentId) => async (dispatch) => {
    try {

        dispatch({
            type: "deleteCommentRequest"
        });

        const { data } = await axios.delete(`api/v1/post/comment/${id}`, {
            data: { commentId }
        });

        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message

        });

    }
};



// <-- for creating newPost -->

export const createNewPost = (Image, caption) => async (dispatch) => {

    try {
        dispatch({
            type: "newPostRequest"
        });

        const { data } = await axios.post('api/v1/post/upload',
            {
                Image,
                caption
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        },
        );

        dispatch({
            type: "newPostSuccess",
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: "newPostFailure",
            payload: error.response.data.message
        })
    }
}


// <-- for upadating post (caption) -->

export const updatePost = (caption, id) => async (dispatch) => {

    try {
        dispatch({
            type: "updatePostRequest"
        });

        const { data } = await axios.put(`api/v1/post/${id}`,
            {

                caption,
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        },
        );

        dispatch({
            type: "updatePostSuccess",
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: "updatePostFailure",
            payload: error.response.data.message
        })
    }
}


// <-- for deleting the owners post -->

export const deletePost = (id) => async (dispatch) => {

    try {
        dispatch({
            type: "deletePostRequest"
        });

        const { data } = await axios.delete(`api/v1/post/${id}`);

        dispatch({
            type: "deletePostSuccess",
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: "deletePostFailure",
            payload: error.response.data.message
        })
    }
}




