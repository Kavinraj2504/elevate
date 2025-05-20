let jwt=require('jsonwebtoken');
const key="kavinraj";
async function authenticate(req,res){
    let token=req.headers.authorization.split(' ')[1]||null;
    if(!token){
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('Not a valid token');
    }
    try {
        let decodedToken = jwt.verify(token, key)
        return decodedToken;
    }
    catch(err){
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('Not a valid token');
        return null
    }

}
module.exports={authenticate}