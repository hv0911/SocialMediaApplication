import { Avatar, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './UpdateProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loadUser, updateProfile } from '../../actions/User';
import Loader from '../Loading/Loader'

const UpdateProfile = () => {

  // const {user} = useSelector((state) => state.user);
  const { error, loading, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message
  } = useSelector((state) => state.likePost);


  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [prevAvatar, setPrevAvatar] = useState(user.avatar.url)
  const dispatch = useDispatch();
  const alert = useAlert();


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setPrevAvatar(Reader.result);

        setAvatar(Reader.result);
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   await dispatch(updateProfile(name, email, avatar));
   dispatch(loadUser());

  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors"
      })
    }

    if(updateError){
      alert.error(updateError);
      dispatch({
        type:"clearErrors"
      })
    }

    if(message){
      alert.success(message);
      dispatch({
        type:"clearMessage"
      })
    }
  }, [dispatch, error, alert,updateError,message])



  return (
 loading ? <Loader />:
    <div className='updateProfile'>
      <form className='updateProfileForm' onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
          Social Media App
        </Typography>
        <Avatar
          src={prevAvatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />


        <input type="file" accept='image/*' onChange={handleImageChange} />

        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          className='updateProfileInputs'

          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className='updateProfileInputs'

          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />




        <Button disabled={updateLoading} type='submit'> Update</Button>


      </form>
    </div>
  )

}

export default UpdateProfile;