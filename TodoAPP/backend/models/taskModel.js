const mongoose = require('mongoose');
let taskSchema=new mongoose.Schema({
    taskName:{
        type: String,
    },
deadline:{
        type:Date

},
    createdAt:{
        type:Date.now(),
    },
    status:{
        type:String,
        enum:["Not Started",'pending','completed']
    },
userId:{
        type:mongoose.Schema.ObjectId,
    required:true,

}
})

let userSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    AccountCreatedAt:{
        type:Date.now(),

    },
    emailId:{
        type:String,
        required:true,
        unique:true

    },
password:{
        type: String,
    required: true,
}
})
let taskModel=mongoose.model('Task',taskSchema);
let userModel=mongoose.model('User',userSchema);
module.exports={taskModel,userModel};



