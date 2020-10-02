var express = require("express");
const fs = require("fs");
var path = require("path");
const db = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
   

 

// Data

// API Routes


app.get("/api/notes", function(req, res){
    fs.readFile("db/db.json", "utf8", function(err){
    if (err)
    return err
    })
    return res.json(db)
   
});


app.post("/api/notes", function(req, res){
    var newNote = req.body;
    newNote.id = db.length
    console.log(newNote);
    db.push(newNote);
    


    fs.writeFileSync("db/db.json", db, "utf8", function(err){
        if (err)
        return err
    })
    return res.end();
});



app.delete("/api/notes/:id", function(req, res){

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