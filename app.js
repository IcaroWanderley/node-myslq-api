const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const testsRoutes = require('./routes/tests'); // Ensure this path is correct

app.use(bodyParser.json());

app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/test", testsRoutes);

module.exports = app;