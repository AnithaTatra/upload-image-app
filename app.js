'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();


app.use(cors());

const port = process.env.PORT || 5000 ;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
            cb(null, file.filename + '-' + Date.now() + file.originalname)
    }
});

const upload  = multer({
	storage:storage
});
app.post("/upload_img",upload.single("myImg"),async(req,res,next)=>{
	
	if(req.file){
		const pathName = req.file.path
		res.send(req.file.pathName)
	}

})

app.get("/",(req,res)=>{
	res.send("Success");
})

app.listen(port, () => {
    console.log(`Server Started at ${port} Port`);
  });


  