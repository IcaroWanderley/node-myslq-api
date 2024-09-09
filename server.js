const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts'); // Importe a rota de posts

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // Adicione a rota de posts

// Create the server
const server = http.createServer(app);

// Define the port
const port = process.env.PORT || PORT;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});