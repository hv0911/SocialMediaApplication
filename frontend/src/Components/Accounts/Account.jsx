import React, { useEffect, useState } from 'react';
import './Account.css';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getMyPosts } from '../../actions/User'
import Loader from '../Loading/Loader';
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import Post from "../Post/Post"
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import User from '../User/User';
import { logoutUser } from '../../actions/User'

const Account = () => {

    const dispatch = useDispatch();

    const { user, loading: userLoading } = useSelector((state) => state.user)
    const { posts, error, loading } = useSelector((state) => state.MyPosts);
    const { error: likeError, message } = useSelector((state) => state.likePost);
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);

    const alert = useAlert();


    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success("Logout Successfully");
    }


    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            alert.error(likeError)
            dispatch({
                type: "clearErrors",
            })
        }
        if (message) {
            alert.success(message)
            dispatch({
                type: "clearMessage",
            })
        }
    }, [alert, likeError, message, dispatch, error]);

    const deleteProfileHandler = async () => {
        await dispatch(deleteProfile());
        dispatch(logoutUser());
    }



    return (
        loading === true || userLoading === true ? <Loader /> : (
            <div className="account">
                <div className="accountleft">
                    {
                        posts && posts.length > 0 ?
                            posts.map((post) => (
                                <Post
                                    key={post._id}
                                    postId={post._id}
                                    caption={post.caption}
                                    postImage={post.Image.url}
                                    likes={post.likes}
                                    comments={post.comments}
                                    ownerImage={post.owner.avatar.url}
                                    ownerName={post.owner.name}
                                    ownerId={post.owner._id}
                                    isAccount="true"
                                    isDelete="true"
                                />
                            ))


                            : <Typography>no post Uploaded yet</Typography>
                    }
                </div>
                <div className="accountright">
                    <Avatar src={user.avatar.url}
                        sx={{ height: "8vmax", width: "8vmax" }}
                    />
                    <Typography variant='h5'>
                        {user.name}
                    </Typography>
                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>
                                followers
                            </Typography>

                        </button>
                        <Typography>{user.followers.length}</Typography>
                    </div>

                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            <Typography>
                                following
                            </Typography>

                        </button>
                        <Typography>{user.following.length}</Typography>
                    </div>

                    <div>
                        <Typography>
                            Posts
                        </Typography>

                        <Typography>{user.posts.length}</Typography>
                    </div>

                    <Button onClick={logoutHandler} variant='contained'>Logout</Button>

                    <Link to='/update/profile'>Edit Profile</Link>
                    <Link to='/update/password'>Change Password</Link>

                    <Button
                        onClick={deleteProfileHandler}
                        variant='text'
                        style={{ color: "red", margin: "2vmax" }}
                    >Delete My profile</Button>

                    <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                        <div className="DialogBox">
                            <Typography variant='h4' style={{ margin: "2vmax" }}>Followers</Typography>
                            {user.followers && user.followers.length > 0 ?

                                user.followers.map((follower) => (
                                    <User
                                        key={follower._id}
                                        name={follower.name}
                                        userId={follower._id}
                                        avatar={follower.avatar.url}
                                    />
                                ))
                                : <Typography>No followers</Typography>

                            }
                        </div>
                    </Dialog>



                    <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                        <div className="DialogBox">
                            <Typography variant='h4' style={{ margin: "2vmax" }}>Followers</Typography>
                            {user.following && user.following.length > 0 ?

                                user.following.map((follows) => (
                                    <User
                                        key={follows._id}
                                        name={follows.name}
                                        userId={follows._id}
                                        avatar={follows.avatar.url}
                                    />
                                ))
                                : <Typography>No followings</Typography>
                            }
                        </div>
                    </Dialog>




                </div>


            </div>


        )

    )
}

export default Account;