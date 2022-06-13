import React,{useState,useEffect} from 'react'
import { Button, Typography } from '@mui/material';
import './UpdatePassword.css'
import { useDispatch,useSelector } from 'react-redux';
import {changePassword} from '..//../actions/User'
import {useAlert} from "react-alert";

const UpdatePassword = () => {


    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,loading ,message} = useSelector((state)=>state.likePost)


    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(changePassword(oldPassword,newPassword));
    }

    useEffect(() => {
      
        if(error){
            alert.error(error)
            dispatch({
                type:"clearErrors"
            })
        }
    
        if(message){
            alert.success(message)
            dispatch({
                type:"clearMessage"
            })
        }
    
     
    }, [message,alert,error,dispatch])
    

    return (
        <div className='updatePassword'>
            <form className='updatePasswordForm' onSubmit={handleSubmit}>
            <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
                        Social Media App
                    </Typography>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className='updatePasswordInputs'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className='updatePasswordInputs'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Button disabled={loading} type='submit' style={{margin:"1vmax 0 0 0 "}}>Update Password</Button>
                
            </form>
        </div>
    )
}

export default UpdatePassword;