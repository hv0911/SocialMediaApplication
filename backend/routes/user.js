const express = require('express');

const { register,
         followUnfollow,
         login,
         logout,
         UpdatePassword,
         UpdateProfile,
         deleteProfile,
         myProfile,
         getUsersProfile,
         getAllUsers,
         forgetPassword,
         resetPassword,
         getMyPosts,
         getUserPosts,

         }       =         require('../controllers/user');

const { isAuthenticate } = require('../middleware/auth');

const router = express.Router();

router.route("/register").post(register);

router.route('/login').post(login);

router.route('/follow/:id').get(isAuthenticate, followUnfollow);

router.route('/logout').get(logout);

router.route('/update/password').put(isAuthenticate, UpdatePassword);

router.route('/update/profile').put(isAuthenticate, UpdateProfile);

router.route('/delete/me').delete(isAuthenticate, deleteProfile);

router.route("/me").get(isAuthenticate, myProfile);

router.route("/user/:id").get(isAuthenticate, getUsersProfile);

router.route("/my/posts/").get(isAuthenticate,getMyPosts);

router.route("/userposts/:id").get(isAuthenticate,getUserPosts);

router.route("/users").get(isAuthenticate, getAllUsers);

router.route("/forgot/password").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);



module.exports = router;