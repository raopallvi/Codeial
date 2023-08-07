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

module.exports.destroy = function(req , res){
    Comment.findById(req.params.id)
    .then(comment=>{
        if(comment.user == req.user.id)
        {
            // Also delete comment id from post comment array
            let postId = comment.post;
            // pull particular comment id from comments
            Post.findByIdAndUpdate(postId , {$pull : {comments : req.params.id}})
            .then(post=>{
                return res.redirect('back');
            })
            .catch(err=>{
                console.log(err);
            })
            
            
            Comment.deleteOne({_id : req.params.id})
            .then(()=>
            {
                return res.redirect('back');
            })
            .catch(err=>{
                console.log("Error in deleting comment" , err);
                return;
            })
        }
        else
        {
            res.redirect('back');
        }
    })
    .catch(err=>{
        console.log("Error in finding comment : " , err);
        return ;
    })
}
