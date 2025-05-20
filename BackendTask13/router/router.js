const http=require('http')
const fs = require('fs');
const url=require('url');
const{getDb, dataParser}=require('../utils/utils');
const path=require('path');
// const path = require('path');
const jwt=require('jsonwebtoken');
const {authenticate}=require("../middleware/authenticate");
const key="kavinraj";
// let db=require()

async function getNotes(req,res){
    let user=await authenticate(req,res);

    const parsedUrl=url.parse(req.url,true);
    const id=parsedUrl.pathname.split("/")[2];
let db;
    const dbPath = path.join(__dirname, '../db/db.json');
     db=fs.readFileSync(dbPath,'utf8');

    db=JSON.parse(db)
    console.log(db)
    db=db.filter((ele)=>ele.id==id)
    if(user.id===id,)
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end(JSON.stringify(db))

}

async function addNotes(req,res){
    // dataParser(req,true)
}

async function login(req,res){
let body=await dataParser(req)
    // console.log(body)
    // res.writeHead(200,{'Content-Type':'text/plain'})
   let users=fs.readFileSync(path.join(__dirname, '../db/users.json')).toString();
users=JSON.parse(users);
let user=users.find((ele)=>ele.id===body.id&&ele.name===body.name);
    if(!user){
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end("user not found")

    }
    else{
      const token = jwt.sign(user,key, { algorithm: 'HS256' });

        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(token))
    }

}



module.exports = {getNotes,login}




