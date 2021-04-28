const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const user = require('./routes/users.js');
const card = require('./routes/cards.js');
const {
  login, createUser,
} = require('./controllers/usersControllers');
const auth = require('./middleware/auth');

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

app.post('/signin', login);
app.post('/signup', jsonParser, createUser);
app.get('/users/me', auth);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.post('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.delete('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
