const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },// Post is done by user so we have to attach or referenvce this post with user
    user: {
        type : mongoose.Schema.Types.ObjectId ,// always unique
        ref : 'user' // User
    },
    // include array of ids of all comments so that we dont need to traverse whole comment schema to collect all comments
    comments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comment'
    }]
},{
    timestamps:true
    }
)

const post = mongoose.model('post', postSchema);
module.exports = post;