var mongoose = require("mongoose");
var articleSchema = new mongoose.Schema({
    name: String,
    image: String,
    descritpion: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

module.exports = mongoose.model("Article", articleSchema);