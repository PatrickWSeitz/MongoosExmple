var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/gameEntries",{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MOngoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

//exaple routes
app.get("/", function(req,res){
    //res.send("Hello There");
    res.redirect("gameList.html")
})

app.get("/", function(req,res){
    res.send("What's cracking dude?");
})

app.post("/saveGame", function(req,res){
    console.log(req.body);
    
    
    new Game(req.body).save().then(function(){
        //res.send(req.body);
        res.redirect("gameList.html");
    })
})

app.get("/getGames", function(req,res){
    Game.find({}).then(function(game){
        //console.log({game});
        res.json({game});
    });
})

app.post("/deleteGame", function(req,res){
    console.log(`Game Deleted ${req.body.game._id}`);
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('gameList.html');
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
    
})
