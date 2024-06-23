const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route')
const postRoute = require('./routes/post.route')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const port = 3000;

const tempFileDir = process.env.TEMP_FILE_DIR || '/tmp';

// Ensure temp directory exists
if (!fs.existsSync(tempFileDir)) {
  fs.mkdirSync(tempFileDir, { recursive: true });
}

// app.use(express.json());

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: tempFileDir
}));


app.use('/uploads', express.static('src/uploads'))

app.use('/users', userRoute);
app.use('/posts', postRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
