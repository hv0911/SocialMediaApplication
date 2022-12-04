import { Avatar, Button, Typography } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/User';
import { useAlert } from 'react-alert';

const Register = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    }
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
     dispatch(registerUser(name, email, password, avatar));
   
  };

  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors"
      })
    }
  }, [dispatch, error, alert])



  return (
    <div className='register'>
      <form className='registerForm' onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
          Social Media App
        </Typography>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />


        <input type="file" accept='image/*' onChange={handleImageChange} />

        <input
          type="text"
          name="text"
          placeholder="Enter your Name"
          className='registerInputs'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className='registerInputs'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          className='registerInputs'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to='/'><Typography>Already sign Up ?</Typography></Link>

        <Button disabled={loading} type='submit'> Sign up</Button>


      </form>
    </div>
  )
}

export default Register;