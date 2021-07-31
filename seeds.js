var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
              {
                name: "Beach Sunset",
                image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
                description: "Evening view of sunset at the beach"
              },
              {
                name: "Cloud's Rest",
                image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
                description: "Resting on a bright sunny day looking at clouds"
              },
              {
                name: "Trees Rest",
                image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
                description: "Resting with the trees"
              }
            ]

function seedDB(){
    /*Campground.remove({},function(err){
       if(err){
           console.log(err);
       } else {
           console.log("removed campdrounds");
       }
       
        //add a few campgrounds 
       data.forEach(function(seed){
       Campground.create(seed, function(err,campground){
           if(err){
               console.log(err);
           } else {
               console.log("added a campground");
               //add a comment 
               Comment.create({
                   text: "This place is nice",
                   author:"Hower"
               },function(err,comment){
                   if(err){
                       console.log(err);
                   } else {
                      campground.comments.push(comment);
                      campground.save();  
                      console.log("created new comment");
                   }
                  
               });
           }
        }); 
     });
    
  });*/
    
}

module.exports = seedDB();