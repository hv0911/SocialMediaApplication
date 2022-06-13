import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import './ReserPassword.css'
import { resetPassword } from '../../actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';


const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const { error, message, loading } = useSelector((state) => state.likePost);


    const SubmitHandler = async (e) => {
        // calling reset Password function
        console.log(params);
        e.preventDefault();
        await dispatch(resetPassword(params.token, newPassword));
    }


    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch({
                type: "clearErrors"
            })
        }
        if (message) {
            alert.success(message);
            dispatch({
                type: "clearMessage"
            })
        }
    }, [alert, message, error, dispatch]);


    return (
        <div className='resetPassword'>
            <form className='resetPasswordForm' onSubmit={SubmitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
                    Social Media App
                </Typography>


                <input
                    type="password"
                    name="password"
                    placeholder="Enter NewPassword"
                    className='resetPasswordInputs'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Link to='/forgot/password'>
                    <Typography>
                        Request Another Token!
                    </Typography>
                </Link>

                <Button disabled={loading} type='submit' variant="text">Reset Password</Button>


            </form>


        </div>
    )
}

export default ResetPassword;