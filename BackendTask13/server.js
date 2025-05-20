const http=require('http')
const fs = require('fs')
const path=require('path')
const {getNotes,login}=require("./router/router");
const{authenticate}=require("./middleware/authenticate");
const server=http.createServer((req,res)=>{
const method=req.method;
const url=req.url;
//health check
    if (method === 'GET' && url === '/') {
        authenticate(req, res)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("welcome to the server");

        // Route: GET /notes
    } else if (method === 'GET' && url.startsWith('/notes')) {

        getNotes(req,res);

        // Route: POST method to login
    } else if (method === 'POST' && url.startsWith('/login')) {
        login(req,res);


    }
    else if(method==='POST' && url.startsWith('/login')) {

    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }

})

server.listen(3000,()=>{
    console.log('Server started on port 3000')

})
