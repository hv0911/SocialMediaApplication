import React, { useState } from 'react';
import "./Search.css";
import { Typography, Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/User';
import User from '../User/User';


const Search = () => {


  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const {users,loading} = useSelector((state)=>state.allUsers)


  const handleSubmit = (e) => {
           e.preventDefault();
           dispatch(getAllUsers(name));

  }

  return (

    <div className='search'>
      <form className='searchForm' onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }} className="heading" align='center'>
          Social Media App
        </Typography>
        <input
          type="text"

          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <Button type="submit" disabled={loading} >Search</Button>
      <div className="searchResults">
        {
          users && users.map((user)=>(
            <User
            key={user._id}
            userId={user._id}
            avatar={user.avatar.url}
            name={user.name}

             />
          )
           
          )
        }
      </div>
      </form>

    </div>
  )
}

export default Search;