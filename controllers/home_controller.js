const post = require('../models/post');
const user = require('../models/user');
module.exports.home = function(req , res)
{
    console.log(req.cookies);
    res.cookie('user_id' , 25);
    
    // post.find({})
    // .then(posts=>{
    //     return res.render('home.ejs' , {
    //         title : "Home",
    //         posts : posts
    //     });
    // })
    // .catch(err=>{
    //     console.log("Error in finding posts in post schema :" , err);
    // })
    // Pre populating an object
    post.find({}).populate('user')
    .populate({
        path : 'comments' ,
        populate : {
            path : 'user'
        }
    })
    .exec()
    .then(posts=>{
        return res.render('home.ejs' , {
            title : "Home",
            posts : posts
        });
    })
    .catch(err=>{
        console.log("Error in finding posts in post schema :" , err);
    })
    
}
