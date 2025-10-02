import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

FullName:{type:String, required:true},
Email:{type:String,required:true,unique:true},
salt:{type:String},
password:{type:String,required:true},
role:{type:String,enum:["USER","ADMIN"],default:"USER"},
})

const userModel= new mongoose.model("user",userSchema);

export default userModel;