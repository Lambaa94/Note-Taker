var express = require("express");
const fs = require("fs");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
   
    
 // Data

 var notes = []

// API Routes
// this should use fs.readFile
app.get("/api/notes", function(req, res){
    return res.json(notes)
});
// add an id to a new object
app.post("/api/notes", function(req, res){
    var newNote = req.body;
    newNote.id = notes.length
    console.log(newNote);
    notes.push(newNote);
    // Trying to write the new note
    // fs.writeFile("db/db.json", db, function(err){
    //     if (err)
    //     return err
    // })
    return res.end();
});
// for loop
app.delete("/api/notes/:id", function(req, res){
// I want to take the information in db and delete it then post over the new notes
// need to read then re rewrite information.    
const newDb = db.filter(note => note.id !== req.params.id)
    return res.json(newDb) ;
});

app.use(express.static('public'));




// HTML ROUTES

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, function() {
    console.log(`App listening on PORT http://localhost:${PORT}/`);
});