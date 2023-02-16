var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;

var db = require("./config/database");
const { rawListeners } = require("process");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
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

app.get("/getID::id", function(req, res){
    console.log(req.params.id);
    res.redirect("updatePage.html?id=" + req.params.id)
});

//Update route
app.post("/updateGame", function(req, res){
    console.log(req.body);
    //res.redirect('gameList.html');
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function(){
        res.redirect("gameList.html")
    })
})

//Unity route
app.post("/unity", function(req, res){
    console.log("Hello from Unity");

    var newData = {
        "level":req.body.level,
        "timeElapsed":req.body.timeElapsed,
        "name":req.body.name
    }
    console.log(newData);
});

app.get("/SendUnityData", function(req,res){
    console.log("Request Made")
    var dataToSend = {
        "level":9000,
        "timeElapsed":20100.32,
        "name":"George Saban"
    }
    res.send(dataToSend);
});

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
    
})
