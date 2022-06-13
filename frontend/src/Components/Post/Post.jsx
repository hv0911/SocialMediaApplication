import { Avatar, Button, Typography, Dialog } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline
} from "@mui/icons-material"
import { Link } from 'react-router-dom';
import './Post.css'
import { useDispatch, useSelector } from 'react-redux';
import { likeDislikePost, addCommentOnPost ,updatePost,deletePost} from '../../actions/Post';
import { getFollowingPosts, getMyPosts, getUserPosts, loadUser } from '../../actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';



const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = "",
    // userId,
}) => {

    const [Likes, setLikes] = useState(false);
    const [likesUser, setLikesUser] = useState(false);

    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState(caption);
    const [captionValueToggle, setCaptionValueToggle] = useState(false);



    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user)
    const {user:tabUser } = useSelector((state)=>state.userProfile )
   

    const likeDislike = async () => {

        setLikes(!Likes);
        await dispatch(likeDislikePost(postId));

        if (isAccount==="true") {
            dispatch(getMyPosts());

        } else if(isAccount==="user"){
            dispatch(getUserPosts(tabUser._id))
        }
        else 
            {
            dispatch(getFollowingPosts());
        }




    }


    useEffect(() => {

        likes.forEach((item) => {
            if (item._id === user._id) {
                setLikes(true);
            }
        })
    }, [likes, user._id])


    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));



        if (isAccount==="true") {
            dispatch(getMyPosts());

        } 
        else if(isAccount==="user"){
            dispatch(getUserPosts(tabUser._id))
        }
        
        else {
            dispatch(getFollowingPosts());
        }


    }

    const updateCaptionHandler= async(e)=>{
        e.preventDefault();

        await dispatch(updatePost(captionValue,postId));
        dispatch(getMyPosts());
    }


    const deletePostHandler = async()=>{
       await dispatch(deletePost(postId));

       dispatch(getMyPosts());

       dispatch(loadUser())
    }




    return (
        <div className='post'>
            <div className="postHeader">
                {isAccount==="true" ? <Button  onClick={() => setCaptionValueToggle(!captionValueToggle)}>
                    <MoreVert />
                </Button> : null}
            </div>
            <img src={postImage} alt="Post" />

            <div className="postDetails">
                <Avatar src={ownerImage} alt={ownerName}
                    sx={{
                        height: "3vmax",
                        width: "3vmax"
                    }}
                />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>
                <Typography fontWeight={100} color="rgba(0,0,0,0.582)" style={{ alignment: "center" }}>
                    {caption}
                </Typography>
            </div>

            <button style={{
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
                margin: "1vmax 2vmax"
            }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >{likes.length} Likes</button>


            <div className="postFooter">
                <Button onClick={likeDislike}>
                    {Likes ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                <Button onClick={deletePostHandler}>
                    {isDelete && <DeleteOutline />}
                </Button>
            </div>

            { /*  <-- for showing likes of following on Post      */}
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant='h4'>
                        Liked By
                    </Typography>
                    {
                        likes.map((like) => (
                            <User
                                key={like._id}
                                name={like.name}
                                userId={like._id}
                                avatar={like.avatar.url}
                            />
                        ))
                    }
                </div>
            </Dialog>


            {/* <-- for addding Comment on Post  */}

            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                <div className="DialogBox">
                    <Typography variant='h4'>
                        Comments
                    </Typography>
                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Comment Here... "
                            required
                        />

                        <Button on type='submit' variant='contained'>
                            Add
                        </Button>
                    </form>


                    {
                        comments.length > 0 ?
                            comments.map((item) => (
                                <CommentCard
                                    key={item._id}
                                    userId={item.user._id}
                                    avatar={item.user.avatar.url}
                                    name={item.user.name}
                                    comment={item.comment}
                                    commentId={item._id}
                                    postId={postId}
                                    isAccount={isAccount}
                                />
                            )) :
                            <Typography>No comments yet</Typography>
                    }


                </div>
            </Dialog>


            <Dialog open={captionValueToggle} onClose={() => setCaptionValueToggle(!captionValueToggle)} >
                <div className="DialogBox">
                    <Typography variant='h4'>Update Caption</Typography>

                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            // placeholder="Caption Here... "
                            required
                        />

                        <Button type='submit' variant='contained'>
                            Update
                        </Button>

                    </form>





                </div>

            </Dialog>


        </div>

    )
}

export default Post;