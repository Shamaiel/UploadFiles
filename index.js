const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const PORT = 5000;

const app = express();
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())

app.get("/", (req, res)=>{
    return res.render("homepage")

})

function hashId(id) {
  
 return crypto.createHash('sha256').update(id).digest('hex');
  // console.log(ID);
}

function getUploadFolder(id) {
  const hashedId = hashId(id); // Hash the ID
  return path.join(`C:\\imageUploads\\candidatedocs\\${hashedId}`);
}


// const externalFolder = path.join(`C:\\imageUploads\\candidatedocs\\${id}`); 

function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = "2"; // Assuming you pass the ID in the form body
    const folderPath = getUploadFolder(id); // Get the hashed path
    ensureFolderExists(folderPath); // Create the folder if necessary
    // cb(null, externalFolder); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});


const upload = multer({
  storage: storage})

// Route to upload file
app.post('/upload',  upload.single("pdf") ,(req, res) => {
    res.send("uploaded!!")
 
});



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


