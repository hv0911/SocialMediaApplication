const { findOneAndUpdate, findById } = require("../models/post");
const Post = require("../models/post");
// const user = require("../models/user");
const User = require("../models/user");
const cloudinary = require("cloudinary");

// <-- for creating a post --> 
exports.createPost = async (req, res) => {


    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.Image, {
            folder: "posts",
        })

        const newPostData = {
            caption: req.body.caption,

            Image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },

            owner: req.user._id,
        }

        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        user.posts.unshift(post._id);
        console.log(user.posts);

        await user.save();
        res.status(201).json({
            sucess: true,
            message: "Post Created",
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


// <-- for deleting a post --> 
exports.deletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);


        if (!post) {
            return res.status(401).json({
                success: false,
                message: "Post does not exits"
            })
        }
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        await cloudinary.v2.uploader.destroy(post.Image.public_id);
        await post.remove();

        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(req.params.id);


        user.posts.splice(index, 1);

        await user.save();

        res.status(201).json({
            success: true,
            message: "post deleted"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// <-- for like & dislike a post --> 
exports.likeAndUnlikePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "404 Post not found"
            })
        }

        if (post.likes.includes(req.user._id)) {

            const index = post.likes.indexOf(req.user._id);

            post.likes.splice(index, 1);

            post.save();

            return res.status(200).json({
                success: true,
                message: "post Unlike"
            })
        } else {


            post.likes.push(req.user._id);

            post.save();

            return res.status(201).json({
                sucess: true,
                message: "post like"
            })

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


// <-- for getting the post of following(the user in following array) -->
exports.getPostOfFollowing = async (req, res) => {
    try {

        //  by using population method

        /*  const user = await User.findById(req.user._id).populate("following","posts");
   
           res.status(201).json({
               success:true,
               following:user.following
           })  */

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.following
            }
        }).populate("owner likes comments.user");

        res.status(201).json({
            success: true,
            posts: posts.reverse(),
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// <-- for Updating a Caption -->
exports.UpdateCaption = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not Found"
            })
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        post.caption = req.body.caption;
        await post.save();

        res.status(201).json({
            success: true,
            message: "caption Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
    }
}


// <-- for adding and Updating comment -->

exports.commentOnPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            });
        }

        let commentIndex = -1;

        post.comments.forEach((item, index) => {

            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index;
            }
        });

        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment;
            await post.save();

            return res.status(201).json({
                success: true,
                message: "comment updated"
            })

        } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })

            await post.save();

            return res.status(201).json({
                success: true,
                message: "comment added"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
    }
}


// <-- for deleting a comment on post -->
exports.deleteComment = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            });
        }

        console.log(req.body.commentId);
        console.log(post.comments.user);

        if (post.owner.toString() === req.user._id.toString()) {

            if (req.body.commentId === undefined) {
                return res.status(404).json({
                    success: false,
                    message: "Enter commentId"
                })
            }

            post.comments.forEach((item, index) => {
                if (req.body.commentId.toString() === item._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            });

            await post.save();

            return res.status(201).json({
                success: true,
                message: "selected Comment deleted"
            })


        } else {

            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            });

            await post.save();

            res.status(201).json({
                success: true,
                message: "your comment deleted"
            });

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
    }
};
