const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user.id
    })
    .then(post=>{
        console.log("Post created successfully !");
        console.log(post);
        return res.redirect('back');
    })
    .catch(err=>{
        console.log("Error in creating a post !" , err);
    })
}

module.exports.destroy = function(req , res)
{
    
    Post.findById({_id : req.params.id})
    .then(post=>{
        // when we compare two id's then they must be string.
        if(post.user == req.user.id){
            Post.deleteOne({ _id: req.params.id })
            .then(() => {
                // Delete all comments associated with the post
                Comment.deleteMany({ post: req.params.id })
                    .then(() => {
                        return res.redirect('back');
                    })
                    .catch(err => {
                        console.log("Error in deleting comments: ", err);
                        return res.redirect('back');
                    });
            })
            .catch(err => {
                console.log("Error in deleting post: ", err);
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    })
    .catch(err=>{
        console.log("Error in finding post for deletion :" , err);
        return;
    })
}