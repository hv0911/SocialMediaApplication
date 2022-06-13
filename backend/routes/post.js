const express = require('express');

const {  createPost,
         likeAndUnlikePost,
         deletePost,
         getPostOfFollowing,
         UpdateCaption,
         commentOnPost,
         deleteComment }      =    require('../controllers/post');

const { isAuthenticate } = require('../middleware/auth');


const router = express.Router();

router.route("/post/upload").post(isAuthenticate, createPost);

router.route("/post/:id")
    .get(isAuthenticate, likeAndUnlikePost)
    .put(isAuthenticate, UpdateCaption)
    .delete(isAuthenticate, deletePost);

router.route("/posts").get(isAuthenticate, getPostOfFollowing);

router.route("/post/comment/:id")
    .put(isAuthenticate, commentOnPost)
    .delete(isAuthenticate, deleteComment);
    





module.exports = router;