//Accessing express npm and file system
const express = require("express");
const path= require("path");
const fs= require("fs");


//Setting up Express APP
const app= express();
const PORT= process.env.PORT || 3050;
const homepage= path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get ("/notes", (req, res) => {
  res.sendFile(path.join(homepage, "notes.html"))
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.get("/api/notes/:id", (req, res) => {
  let savedNotes= JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)])
});

app.get("*", (req, res)=>{
  res.sendFile(path.join(homepage,"index.html"))
});

//creating post on page


//Listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });