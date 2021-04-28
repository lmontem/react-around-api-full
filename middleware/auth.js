const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret key');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  req.user = payload;
  next();
}

module.exports(auth);
