import mongoose from "mongoose";

const blogScheme = new mongoose.Schema({
    blogImage:String,
    title:{
        type:String,
        required : true
    },
    shortContent:{
        type:String,
        required:true
    },
    fullContent:{
        type:String,
        required:true
    },
},{timestamps:true})

const blogModel = mongoose.models.blog || mongoose.model('blog', blogScheme);


export default blogModel