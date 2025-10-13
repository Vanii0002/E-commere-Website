import mongoose from "mongoose";

const connectDB= async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/shooping-cart")
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
}   );}

export default connectDB;