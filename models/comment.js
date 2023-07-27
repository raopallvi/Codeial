const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content :{
        type: String,
        required : true
    },
    //comment belongs to a user
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    // comment belongs to a post
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    }
},{
    timestamps: true
})

const comment = mongoose.model('comment' , commentSchema);
module.exports = comment;