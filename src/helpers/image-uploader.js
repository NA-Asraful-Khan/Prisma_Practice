const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/uploads');
    },
    filename: function(req, file, cb){
        // // Extract the original file name and extension
        // const originalName = path.parse(file.originalname).name;
        // const extension = path.extname(file.originalname);

        // // Create a new file name with a timestamp and the original name
        // const newFileName = `${originalName}_${Date.now()}${extension}`;

        // cb(null, newFileName); // Set the new file name
        
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('Unsupported files'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
});

module.exports = {
    upload: upload
}
