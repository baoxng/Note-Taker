//Accessing express npm and file system
const express = require("express");
const path = require("path");
const fs = require ("fs");

//Setting up Express APP
const app= express ();
const PORT= pross.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data

//Routes

