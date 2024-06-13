const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route')
const app = express();
const port = 3000;

app.use(express.json());
// // Parse JSON bodies
// app.use(bodyParser.json());

// // Parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
