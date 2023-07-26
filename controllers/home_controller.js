const post = require('../models/post');
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
    post.find({}).populate('user').exec()
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
