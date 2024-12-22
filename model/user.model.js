import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:()=>uuidv4()
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        required: true,
        type: String,
    }
},{timestamps:true})// create automitically CreatedAt and UpdatedAt
const User = new mongoose.model("User",userSchema)
export default User
