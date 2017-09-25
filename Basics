Objective: Learn about Mean Stack 

Development Environment: Cloud 9's Node development environment.

NODE Basics
=============
Run a file with node
---------------------
exectute JS file by using node command 
node filename 

Note: - Make sure to have a mongo deamon running before executing node app.js file


Introduction to NPM(Node.js Package Manager)
------------------------------------------------
We can access libraries in node at server side is by using NPM

It has a command line tool to install packages like express

syntax: npm install NameOfpackage

NPM - repositories of 2000 packages like Mongoose,Morgan,Express etc

Use 'npm install' to install a package


package.json: File containing all meta data related to specific project, dependencies
============  Every single JS package contains package.JSON  


npm init: Creates a new package.JSON file 
========= It asks a few questions about description, index,entry point(generally app.js)etc


EJS- render data and JS to create a HTML page
=====
 1.Rendering HTML and Templates(Dynamic HTML files)
 
 2.res.render("filename.ejs") --send html or css files to server by embedding in ejs file

 3.Files of EJS that are rendered are searched inside views directory
 
 4.<%= %> value is rendered to page  
  <% %> logic or loop we dont want to add to page


first Mongo Commands:
---------------------
* mongod - starts mongo deamon that runs on the background to keep aceesing Mongo DB

* mongo - opens up the mongo shell

* help - gives a list of basic features in MongoDb

* showdb's - lists the names of all of the databases 

* use -    use one of the db's and also help us to create a db and use it 

* insert -  db.dogs.insert({name:"Rusty",breed:"Mutt"}) - collection to insert data into database 
            show collections 

* find -    db.dogs.find() - returns all the elements in collection 
            db.dogs.find({name:"rusty"})  //find a dog with name rusty 
 
* update -  db.dogs.update({name:"Lulu"}, {breed:"Labradoodle"}) //changes all dogs breed to lab where dog name id lulu
            db.dogs.update({name:"Rusty"}, {$set:{name: "tater", isCute: true}});
            //update dog name to Tater and add property isCute to a particular dog named rusty

* remove -  db.dogs.remove({breed:"labradoodle"}) //remove all dogs with breed is labradoodle

            db.dogs.remove({breed:"labradoodle"}).limit(1) - removes only one dog 
              

CRUD - create read update delete
    
Mongoose - Elegant object modelling for node.js
         - This package helps interact with mongod db 
         - ODM - object data Mapper - help link database, mongo deamon and node 

RESTFUL ROUTES
--------------------
name          url                    verb                 comments
-----------------------------------------------------------------------------
INDEX        /campgrounds            GET                  Displays list of all campgrounds  
NEW          /campgrounds/new        GET                  Display a form to make a new campground
CREATE       /campgrounds            POST                 Add a new campground to DB 
SHOW         /campgrounds/:id        GET                  Shows info of one campgrounds 
EDIT         /campgrounds/:id/edit   GET                  Show edit form for one campground
UPDATE       /campgrounds/:id        PUT                  Update a particular campground,then redirect somewhere
DELETE       /campgrounds/:id        DELETE               Delete a particular campgrounds,then redirect somewhere 

