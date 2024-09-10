const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors'); // Importar o módulo cors
const http = require('http');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Configurar CORS para permitir requisições do frontend

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});