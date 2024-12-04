const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const transactionRoutes = require('./routes/transactions');

const app = express();

const path = require('path');

// Adicione a configuração para servir a pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Redirecione a rota principal para o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use(cors());
app.use(bodyParser.json());
app.use('/transactions', transactionRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.log(err));
