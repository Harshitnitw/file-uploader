// Import required modules
const express = require('express');
const multer = require('multer');
const path = require('path');

// Create an instance of Express
const app = express();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

app.use(express.static('public/index.html'))

app.get('/', (req, res) => {
  res.sendFile('/workspaces/codespaces-blank/public/index.html');
});


// POST route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully!' });
  });
  
  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });