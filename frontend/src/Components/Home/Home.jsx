import './Home.css';
import { useDispatch, useSelector } from "react-redux"

import React, { useEffect } from 'react';
import User from '../User/User';
import Post from '../Post/Post'
import { getAllUsers, getFollowingPosts } from '../../actions/User';
import Loader from '../Loading/Loader';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';


const Home = () => {

  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.postsOfFollowing)
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
  const {error:likeError,message} = useSelector((state)=>state.likePost)

  const alert = useAlert();

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
    
  }, [dispatch]);

  useEffect(() => {
    if(error){
        alert.error(likeError)
        dispatch({
            type:"clearErrors",
        })
    }
    if(message){
        alert.success(message)
        dispatch({
            type:"clearMessage",
        })
    }
   }, [alert,likeError,message,dispatch,error]);
   



  return loading === true || usersLoading === true ? (<Loader />) : (
    <div className='home'>

      <div className="homeleft">
        {posts && posts.length > 0 ? posts.map((post) => (
          <Post
            key={post._id}
            // postImage="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg"
            //   ownerName="Harsh" 
            //   caption="this is sample post"
            postId={post._id}
            caption={post.caption}
            postImage={post.Image.url}
            likes={post.likes}
            comments={post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            isAccount={false}
          />

        )) : <Typography variant='h6'>No posts yet</Typography>}

      </div>

      <div className="homeright">
        {users && users.length > 0 ? users.map((user) => (
          <User
          key={user._id}
            name={user.name}
            userId={user._id}
            avatar={user.avatar.url}
          />
        ))
          : <Typography variant='h6'>No users yet</Typography>
        }
      </div>

    </div>
  )
}

export default Home;

