const mongoose = require('mongoose');

async function connectDB(url){
    try{
        await mongoose.connect(url)
        .then(()=>{
            console.log('Connected to DB');
        })

    }
catch(err){
    console.log(err);
    }
}
module.exports = connectDB;