/*Associations - idea of having related data



Relations - one: one, one: many and many:many

one: one  --- one book has one title
one: many --- one user can have multiple photos [encounter most]
many:many --- students and courses, books and authors*/


var mongoose = require("mongoose");

//SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
   name:          String,
   price:         String,
   image:         String,
   description:   String,
   author: {
        id: {
           type:mongoose.Schema.Types.ObjectId,
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


module.exports = mongoose.model("Campground",campgroundSchema);