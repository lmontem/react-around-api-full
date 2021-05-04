const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const user = require('./routes/users.js');
const card = require('./routes/cards.js');
const { auth } = require('./middleware/auth.js');
const {
  Login, createUser, getUserById,
} = require('./controllers/usersControllers');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(user);
app.use(card);

app.post('/signin', jsonParser, Login);
app.post('/signup', jsonParser, createUser);
app.get('/users/me', auth, getUserById);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.post('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.delete('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.statusCode === 500 ? 'Error from server' : err.message });
  next();
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
