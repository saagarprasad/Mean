var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/test";

var prompt = require("prompt");
prompt.start();

console.log("1.Insert 2.Delete 3.Update 4.Find");
prompt.get(["choice"],function(err,res){
    if(err) throw err;

    switch(res.choice){
        case "1":
            prompt.get(["name","regno"],function(err,res){
                if(err) throw err;
                MongoClient.connect(url,function(err,db){
                    if(err) throw err;
                    var dbo = db.db("test");
                    var obj = {name:res.name, regno:res.regno};
                    dbo.collection("student").insertOne(obj,function(err,res){
                        if(err) throw err;
                        console.log("Added");
                    })
                    
                })
            })
            break;
        
        case "2": 
            prompt.get(["regno"],function(err,res){
                if(err) throw err;
                MongoClient.connect(url,function(err,db){
                    if(err) throw err;
                    var dbo = db.db("test");
                    var query = {regno:res.regno};
                    dbo.collection("student").deleteOne(query,function(err,res){
                        if(err) throw err;
                        console.log("Deleted!");
                    })
                    
                })
            })
            break;
        
        case "3":
            prompt.get(["name","regno"], function(err,res){
                if(err) throw err;
                MongoClient.connect(url,function(err,db){
                    if(err) throw err;
                    var dbo = db.db("test");
                    var query = { regno: res.regno};
                    var upd_val = {
                        $set:{
                            name: res.name,
                            regno: res.regno
                        }
                    };
                    dbo.collection("student").updateOne(query,upd_val,function(err,res){
                        if(err) throw err;
                        console.log("Updated!!");
                    })
                })
            })
            break;

        case "4":
            MongoClient.connect(url,function(err,db){
                if(err) throw err;
                var dbo = db.db("test");
                dbo.collection("student").find({}).toArray(function(req,res){
                    console.log(res);
                })
            })
            break;
    }
})