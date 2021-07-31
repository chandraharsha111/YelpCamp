var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware/index_middleware");

// Index route  
router.get("/campgrounds", function(req,res){
    //get all campgrounds from db
    Campground.find({}, function(err,allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/Index",{campgrounds: allCampgrounds, currentUser: req.user});
       }
    });
    
});


//NEW route 
router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new",{currentUser: req.user}); 
});

//SHOW route 
router.get("/campgrounds/:id", function(req, res) {
   //rendering show template with provided campground id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
      if(err){
          console.log(err);
      } else{
            console.log(foundCampGround);
            res.render("campgrounds/show",{campground: foundCampGround , currentUser: req.user});
      }
   });
 
});


//create route - post data to DB and redirect 
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
    //adding an item to campdrounds array from post request given by user
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc  = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampGround = {name: name ,price: price,image: image,description: desc,author: author};
    //save new campground to db
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             //redirecting to get methods post request
              res.redirect("/campgrounds");
        }
    });
   
});

// Edit route to show the form 
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
       Campground.findById(req.params.id,function(err, foundCampGround){
                 res.render("campgrounds/edit",{campground: foundCampGround,currentUser: req.user});     
});

});




// Update route 
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req,res){
   // find and update 
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect to show page 
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// Destroy campgrounds
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
   // find and remove 
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect('/campgrounds');
       }
       
   })
});






module.exports = router;