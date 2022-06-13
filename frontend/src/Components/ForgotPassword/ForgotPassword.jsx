import React, { useState,useEffect } from 'react'
import "./ForgotPassword.css"
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../actions/User';
import { useAlert } from 'react-alert';


const ForgotPassword = () => {


    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.likePost);

    const SubmitHandler = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email));
    }

    useEffect(() => {

        if(error){
            alert.error(error)
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
    }, [alert,message,error,dispatch]);


    return (
        <div className='forgotPassword'>
            <form className='forgotPasswordForm' onSubmit={SubmitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
                    Social Media App
                </Typography>


                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className='forgotPasswordInputs'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button disabled={loading} type='submit' variant="text">Send Token</Button>


            </form>


        </div>
    )      
}

export default ForgotPassword