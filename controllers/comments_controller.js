const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post : post._id
            })
                .then(comment => {
                    console.log("Comment created successfully : ", comment);
                    post.comments.push(comment);
                    post.save();
                    res.redirect('back');
                })
                .catch(err => {
                    console.log("Error in creating comments :", err);
                })
        })
        .catch(err=>{
            console.log("Post on which you are trying to comment not found!");
        })

}
