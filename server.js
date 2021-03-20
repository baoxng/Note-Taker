//Accessing express npm and file system
const express = require("express");
const path = require("path");
const routes= require('./routes');
const fs = require ("fs");

//Setting up Express APP
const app= express();
const PORT= process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//turn on routes
app.use(routes);



//Listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });