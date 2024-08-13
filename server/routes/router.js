import express from "express";
import upload from "../utils/upload.js";
import File from "../models/file.js";

const router = express.Router();

router.post('/upload', upload.single('file') ,async (req, res) => {

    const fileObj = {
        path : req.file.path,
        name : req.file.originalname,
    }

    try {

        const file = await File.create(fileObj);
        res.status(200).json({
            path : `http://localhost/file/${file._id}`
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error : error.message
        })
    }
})

router.get('/file/:fileId', async (req, res) => {
    try {

        const file = await File.findById(req.params.fileId);

        file.downloadContent++;

        await file.save();
        res.download(file.path, file.name);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error : error.message
        })
    }
})

export default router