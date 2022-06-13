import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/User';
import React, { useEffect } from 'react';
import Home from './Components/Home/Home';
import Account from './Components/Accounts/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/RegisterUser/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Components/UserProfile/UserProfile'
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';



function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadUser());

  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);


  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>

        <Route
          path='/'
          element={isAuthenticated ? <Home /> : <Login />
          } />

        <Route
          path='/account'
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path='/register'
          element={isAuthenticated ? <Account /> : <Register />
          } />

        <Route

          path='/newpost'
          element={isAuthenticated ? <NewPost /> : <Login />
          } />

        <Route
          path='/update/profile'
          element={isAuthenticated ? <UpdateProfile /> : <Login />
          } />

        <Route
          path='/update/password'
          element={isAuthenticated ? <UpdatePassword /> : <Login />
          } />

        <Route
          path='/forgot/password'
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />
          } />

        <Route
          path='/reset/password/:token'
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />
          } />

        <Route
          path='/user/:id'
          element={isAuthenticated ? <UserProfile /> : <ResetPassword />
          } />

        <Route
          path='/search'
          element={ isAuthenticated ? <Search /> : <Login />
          } />


        <Route
          path='*'
          element={ <NotFound />
          } />



      </Routes>


    </Router>


  );
}

export default App;
