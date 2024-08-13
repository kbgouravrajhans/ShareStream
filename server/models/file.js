import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    path : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    downloadContent : {
        type : Number,
        required : true,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 300
    }
})

const File = mongoose.model('file', fileSchema);

export default File;