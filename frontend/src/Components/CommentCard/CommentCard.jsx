import './CommentCard.css'

import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {useSelector, useDispatch } from 'react-redux';
import { deleteUsersComment } from '../../actions/Post'
import { getFollowingPosts, getMyPosts} from "../../actions/User"

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {

  const dispatch = useDispatch();

  const HandleDeleteComment = async () => {
    await dispatch(deleteUsersComment(postId, commentId));

    // change
    if (isAccount==="true") {
     dispatch(getMyPosts());
  } else if(isAccount===""){
     dispatch(getFollowingPosts());
  }

  }


  const { user } = useSelector((state) => state.user);

  return (
    <div className="commentUser">
      <Link to={`user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>
        {comment}
      </Typography>

      {isAccount ? <Button onClick={ HandleDeleteComment}>
        <Delete />
      </Button>
        : userId === user._id ?
          <Button  onClick={ HandleDeleteComment}>
            <Delete />
          </Button> : null
      }
    </div>
  )
};

export default CommentCard;