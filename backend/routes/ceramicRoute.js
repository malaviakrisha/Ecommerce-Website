import express from 'express';
import { addCeramic, listCeramic, removeCeramic } from '../controllers/ceramicController.js';
import multer from 'multer';

const ceramicRouter= express.Router();

//Image storage engine

const storage= multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

ceramicRouter.post("/add",upload.single("image"),addCeramic)
ceramicRouter.get("/list",listCeramic)
ceramicRouter.post("/remove",removeCeramic)



export default ceramicRouter;