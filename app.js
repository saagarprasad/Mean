var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/test";

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/submit",function(req,res){

    var name = req.query.name;
    var regno = req.query.regno;

    MongoClient.connect(url,function(err,db){
        if(err) throw err;

        var dbo = db.db('test');
        var obj = {name: name, regno: regno};

        dbo.collection("student").insertOne(obj,function(err,res){
            if(err) throw err;

            console.log("Inserted");
            db.close();
        })
    })
})

app.listen(4000);