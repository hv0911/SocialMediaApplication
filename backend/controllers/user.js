
const { findById } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
const { sendEmail } = require("../middleware/sendEmail");
const crypto = require('crypto');
const cloudinary = require("cloudinary");


// <-- for registeration of user -->
exports.register = async (req, res) => {
    try {

        const { name, email, password, avatar } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        };


        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
        })

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });

        const token = await user.generateToken();

        const option = { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true }

        res.status(201)
            .cookie("token", token, option)
            .json({
                success: true,
                user,
                token,
            });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// <-- for login a user -->
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password").populate("posts followers following")

        if (!user) {
          return res.status(400).json({
                success: false,
                message: "User does not exits"
            })
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const token = await user.generateToken();

        const option = { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true, }

        res.status(201)
            .cookie("token", token, option)
            .json({
                sucess: true,
                user,
                token,
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
       
    }
};


// <-- for logout a user -->
exports.logout = async (req, res) => {
    try {


        const options = { expires: new Date(Date.now()), httpOnly: true }

        res.status(200).cookie("token", null, options).json({
            success: true,
            message: "logged out"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



// <-- for follow and unfollow a user -->
exports.followUnfollow = async (req, res) => {
    try {
        const loggedUser = await User.findById(req.user._id);
        const Usertofollow = await User.findById(req.params.id);




        if (loggedUser.following.includes(Usertofollow._id)) {
            const indexOwner = loggedUser.following.indexOf(Usertofollow._id);
            const indexUser = Usertofollow.followers.indexOf(loggedUser._id);

            loggedUser.following.splice(indexOwner);
            Usertofollow.followers.splice(indexUser);

            await loggedUser.save();
            await Usertofollow.save();

            return res.status(201).json({
                success: true,
                message: "User unFollow"
            })
        } else {

            loggedUser.following.push(Usertofollow._id);
            Usertofollow.followers.push(loggedUser._id);

            await loggedUser.save();
            await Usertofollow.save();

            res.status(201).json({
                success: true,
                message: "User followed"
            })
        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// <-- for updating a user Password -->
exports.UpdatePassword = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("+password");

        const { newPassword, oldPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status.json({
                success: false,
                message: "Enter oldpassword or new password"
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Incorrect Password"
            })
        };

        user.password = newPassword;
        await user.save();

        res.status(201).json({
            success: true,
            message: "Update Password"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};

// <-- for Updating a Profile -->
exports.UpdateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const { name, email, avatar } = req.body;

        if (name) {
            user.name = name;
            console.log(user.name);
        }
        if (email) {
            user.email = email;
        }

        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
            })
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//  <-- for deleting a profile -->
exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const following = user.following;
        const userId = user._id;
        const followers = user.followers;


        // removing avatar from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await user.remove();

        // logout after deleting profile
        const options = { expires: new Date(Date.now()), httpOnly: true }

        res.cookie("token", null, options)

        //deleting all the posts of user
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            // removing posts from cloudinary
            cloudinary.v2.uploader.destroy(post.Image.public_id);
            await post.remove();
        }

        //removing user from followings followers
        for (let i = 0; i < following.length; i++) {
            const follows = await User.findById(following[i])
            const index = follows.followers.indexOf(userId);
            follows.followers.splice(index, 1);
            await follows.save();
        }

        //removing user from followers following
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i])
            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1);
            await follower.save();
        }

        // removing user comment 
        const allPosts = await Post.find();

        for (let i = 0; i < allPosts.length; i++) {
            const post = await Post.findById(allPosts[i]._id);
            for (let j = 0; j < post.comments.length; j++) {

                if (post.comments[j].user === userId) {
                    await post.comments.splice(j, 1);
                }
            }

            await post.save();
        }

        // removing user likes

        for (let i = 0; i < allPosts.length; i++) {
            const post = await Post.findById(allPosts[i]._id);
            for (let j = 0; j < post.likes.length; j++) {

                if (post.likes[j] === userId) {
                    await post.likes.splice(j, 1);
                }
            }

            await post.save();
        }


        res.status(201).json({
            success: true,
            message: "Profile deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


// <-- for getting information of my Profile
exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts followers following");

        res.status(201).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// <-- for getting all the users Profile
exports.getUsersProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts followers following");


        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(201).json({
            success: true,
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// <-- for getting all the users -->
exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find({
            name: { $regex: req.query.name, $options: "i" }
        });

        res.status(201).json({
            success: true,
            users,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



//<-- for getting post of login User -->

exports.getMyPosts = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }

        res.status(201).json({
            success: true,
            posts

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// <-- get Post of users -->
exports.getUserPosts = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }

        res.status(201).json({
            success: true,
            posts,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// <-- for forgetting password -->


exports.forgetPassword = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();
        console.log(resetPasswordToken);

        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;
        // const resetUrl =`http://localhost:3000/api/v1/password/reset/${resetPasswordToken}`;

        const message = `Reset your Password by clicking the link below:\n\n ${resetUrl} `;

        try {

            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });

            res.status(201).json({
                success: true,
                message: `email send to ${user.email}`
            })

        } catch (error) {

            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save()

            res.status(500).json({
                success: false,
                message: error.message
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}


// <-- for updating resetting  password -->
exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "invalid/expire token"
            })
        }

        user.password = req.body.password;
        await user.save();
        res.status(201).json({
            success: true,
            message: "password reset successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}