var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware  = require("../middleware/index_middleware");

// ---------------------------------------------------------
// New route
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req, res) {
    //find campground by id 
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new",{campground: campground,currentUser: req.user});       
       }
    });
    
});

//create route - post data to DB and redirect 
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
   //look up campground using id
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
             //create new comment 
             Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Created comment successfully");
                    res.redirect('/campgrounds/'+ campground._id);
                }
             });
               
       }
    });
   
});

// route to edit comments 
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
       if(err){
           res.redirect("back");
       } else {
           res.render("comments/edit",{campground_id:req.params.id, comment: foundComment});       
       }
    });
    
});


//COMMENT UPDATE
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/"+ req.params.id);
      }
   });
});


// COMMENT DESTROY ROUTE 
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted!");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});





module.exports = router;