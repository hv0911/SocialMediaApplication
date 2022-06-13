import React, { useState ,useEffect} from 'react';
import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { createNewPost } from '../../actions/Post';
import { loadUser } from '../../actions/User';



const NewPost = () => {


    const [caption, setCaption] = useState("");
    const [Image, setImage] = useState(null);
    const { loading, error, message } = useSelector((state) => state.likePost)
    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
       await dispatch(createNewPost(Image, caption));
        dispatch(loadUser());
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
          dispatch({type:"clearErrors"});
        }

        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"});
        }

    }, [dispatch,error,message,alert]);




    return (
        <div className='newPost'>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <Typography> New Post</Typography>
                {Image && <img src={Image} alt="post" />}
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <input
                    type="text"
                    placeholder='...caption'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)} />
                <Button disabled={loading} type='submit'>Post</Button>
            </form>
        </div>

    )
}

export default NewPost;