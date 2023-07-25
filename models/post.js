const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: string,
        required: true
    },// Post is done by user so we have to attach or referenvce this post with user
    user: {
        type : mongoose.Schema.Types.ObjectId ,// always unique
        ref : 'User'
    }
},{
    timestamps:true
    }
)

const post = mongoose.model('post', postSchema);
module.exports = post;