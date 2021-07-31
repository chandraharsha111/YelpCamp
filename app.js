//Requiring all the packages 
var express              = require("express");
var app                  = express();
var bodyParser           = require("body-parser");         // body - parser to get form data
var mongoose             = require("mongoose");
var Campground           = require("./models/campground"); //importing module from campground.js 
var Comment              = require("./models/comment");
var seedDB               = require("./seeds");            //inital set of data for testing 
var passport             = require("passport");           //package used for authentication
var LocalStrategy        = require("passport-local");     //package used for authentication
var User                 = require("./models/user");
var methodOverride       = require("method-override");
var flash                = require("connect-flash");

/*Mongoose - elegant object modelling for node.js
           - package helps interact with mongod db 
           - ODM - object data Mapper - help link database, mongo deamon and node
*/ 
          
/*RESTFUL ROUTES
--------------------
name          url                    verb                 comments
-----------------------------------------------------------------------------
INDEX        /campgrounds            GET                  Displays list of all campgrounds  
NEW          /campgrounds/new        GET                  Display a form to make a new campground
CREATE       /campgrounds            POST                 Add a new campground to DB 
SHOW         /campgrounds/:id        GET                  Shows info of one campgrounds 
EDIT         /campgrounds/:id/edit   GET                  Show edit form for one campground
UPDATE       /campgrounds/:id        PUT                  Update a particular campground,then redirect somewhere
DELETE       /campgrounds/:id        DELETE               Delete a particular campgrounds,then redirect somewhere */



// requiring routes  
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/auth")

console.log(process.env.DATABASEURL);  

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp_v10",{useMongoClient:true});
//mongoose.connect(process.env.DATABASEURL,{useMongoClient: true}); //connecting to DB on cloud 9 or on Heroku based on environment variables


app.use(bodyParser.urlencoded({extended: true}));   //using body parser
app.set("view engine", "ejs");                      // expect files to be of ejs type by default
app.use(express.static(__dirname + "/public"));     // telling the express framework to look into public directory as it looks into views directory by default
app.use(methodOverride("_method"));                 // use it for update routes 
app.use(flash());                                   // API to use flash messages 





//PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "Hey how are you?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//pass current user to every route 
app.use(function (req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use(campgroundRoutes);
app.use(authRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started");
});