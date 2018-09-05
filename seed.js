var mongoose = require("mongoose");
var Article = require("./models/article");
var Comment = require("./models/comment");

var data = [
    {
        name: "First Article Demo",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/11/4b/75/8b/washington-dc-monuments.jpg" ,
        description: "First Article Demo"
    }
    
    ];
    
    
    function seedDB(){
        
        //add article
            data.forEach(function(seed){
                Article.create(seed, function(err, article){
                    if(err){
                        console.log(err);
                    }else{
                        Comment.create(
                            {
                                text: "This is the first article",
                                author: "Author"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    article.comments.push(comment);
                                    article.save();
                                    console.log("Comment added");
                                }
                            
                            
                            });
                    }
                });
            });
    } 
    
    module.exports = seedDB;