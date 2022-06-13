import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollowUser,getUserPosts, getUserProfile,loadUser } from '../../actions/User'
import Loader from '../Loading/Loader';
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import Post from "../Post/Post";
import { useAlert } from 'react-alert';
import User from '../User/User';
import { useParams } from 'react-router-dom';

const UserProfile = () => {

    const dispatch = useDispatch();

    const { user, loading: userLoading, error: userError } = useSelector((state) => state.userProfile);
    const { user: me } = useSelector((state) => state.user);
    const { posts, error, loading } = useSelector((state) => state.userPosts);

    // fortesting
    //    const { user, loading: userLoading } = useSelector((state) => state.user);

    const { error: followError, message, loading: followloading } = useSelector((state) => state.likePost);
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [MyProfile, setMyProfile] = useState(false);
    const [following, setFollowing] = useState(false);
    const params = useParams();
    const alert = useAlert();

    const followingHandler = async() => {

        setFollowing(!following);
       await dispatch(followUnfollowUser(user._id));
        dispatch(getUserProfile(params.id));
        dispatch(loadUser());


    }

    useEffect(() => {
        console.log("harsh");
        dispatch(getUserPosts(params.id));
        dispatch(getUserProfile(params.id));



    }, [dispatch, params.id]);

    useEffect(() => {
        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollowing(true);
                } else {
                    setFollowing(false);
                }
            })
        }

        if (me._id === params.id) {
            setMyProfile(true);
        }
    }, [user, me._id, params.id]);




    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({
                type: "clearErrors",
            })
        }
        if (followError) {
            alert.error(followError)
            dispatch({
                type: "clearErrors",
            })
        }
        if (userError) {
            alert.error(userError)
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
    }, [alert, followError, userError, message, dispatch, error]);

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
                                    isAccount="user"
                                // UserId={params.id}


                                />
                            ))


                            : <Typography>User had post Uploaded yet</Typography>
                    }
                </div>
                <div className="accountright">
                    {
                        user && (
                            <>

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




                                {
                                    MyProfile ? null :
                                        (
                                            <Button
                                                onClick={followingHandler}
                                                variant='text'
                                                style={{ color: following ? "red" : "blue", margin: "2vmax" }}
                                                disabled={followloading}
                                            >
                                                {following ? "unfollow" : "follow"}
                                            </Button>
                                        )
                                }



                                <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                                    <div className="DialogBox">
                                        <Typography variant='h4' style={{ margin: "2vmax" }}>Followers</Typography>
                                        {user.followers.length > 0 ?                         // user.followers &&

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
                                        {user.following.length > 0 ?           // user.following &&

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
                            </>
                        )}
                </div>


            </div>


        )

    )
}

export default UserProfile;