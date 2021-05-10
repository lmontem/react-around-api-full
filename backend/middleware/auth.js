const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  console.log(req.headers);
  const { authorization } = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('token=', '');

  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, 'secret key');
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;
  next();
}

module.exports = { auth };
