const fs=require('fs');
const path=require('path');
 function getDb(){
     let dbpath=path.join(__dirname,"../db/db.json");
    let data=fs.readFileSync(dbpath,"utf8");
    return JSON.parse(data);

}

// utils/dataParser.js
// utils/dataParser.js
async function dataParser(req) {
    let body = '';

    for await (const chunk of req) {
        body += chunk.toString();
    }

    try {
        return JSON.parse(body); // return as object
    } catch (err) {
        throw new Error('Invalid JSON');
    }
}





// console.log(getDb())
module.exports={getDb,dataParser}
