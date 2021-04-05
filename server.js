//Accessing express npm and file system
const express = require("express");
const path= require("path");
const fs= require("fs");
const { json } = require("express");


//Setting up Express APP
const app= express();
const PORT= process.env.PORT || 3050;
const homepage= path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

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
app.post("/api/notes", (req, res)=>{
  let savedNotes= JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNotes= req.body;
  let noteID= (savedNotes.length).toString();
  newNotes.id= noteID;
  savedNotes.push(newNotes);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Notes have been saved to db.json file. Content:", newNotes)
  res.json(savedNotes);
})


//deleting post on page
app.delete("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Deleting note with ID ${noteID}`);
  savedNotes = savedNotes.filter(currNote => {
      return currNote.id != noteID;
  })
  
  for (currNote of savedNotes) {
      currNote.id = newID.toString();
      newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})

//Listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });