const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const feedbackRoutes = require('./routes/feedbacks');

const app = express();
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/feedbacks', feedbackRoutes);


app.get('/', (req, res) => res.send('FeedbackHub API rodando'));


const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  console.log('Banco sincronizado (SQLite via Sequelize)');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => {
  console.error('Erro ao sincronizar DB:', err);
});
