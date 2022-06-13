import React, { useState, useEffect } from 'react';
import "./Login.css";
import { Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/User"
import { useAlert } from 'react-alert';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error } = useSelector((state) => state.user);
    const { message } = useSelector((state) => state.likePost);

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password));
        console.log(email, password);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
        if (message) {
            alert.success(message);
            dispatch({
                type: "clearMesssage"
            });
        }
    }, [alert, error, dispatch,message]);


    return (
        <div className='login'>
            <form className='loginForm' onSubmit={loginHandler}>
                <div className='heading'>
                    <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
                        Social Media App
                    </Typography>
                </div>
                {/* <input
                    type="text"
                    name="text"
                    placeholder="Enter your Name"
                    value={name}
                /> */}

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/forgot/password">
                    <Typography>
                        Forgot Password ?
                    </Typography>
                </Link>

                <Button type='submit' variant="text">Login</Button>

                <Link to='/register'>
                    New User ?
                </Link>

            </form>


        </div>
    )
}

export default Login;