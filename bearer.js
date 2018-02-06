const debug = require('debug')('http-auth-parser:bearer');
const xtend = require('xtend');
const jwt = require('jsonwebtoken');

const HttpAuthParserBearer = function (req) {
  if (typeof req.headers['authorization'] == 'undefined') {
    req.auth = null;
    return debug('authorization header is missing');
  }

  const [ type, credentials ] = req.headers['authorization'].split(' ');

  if (type !== 'Bearer') {
    return debug('authorization header is not bearer');
  }

  req.auth = xtend({
    type: 'bearer',
    token: credentials
  }, req.auth);

  try { 
    const decoded = jwt.decode(credentials);

    if (decoded !== null) {
      req.auth = xtend({
        jwt: {
          token: credentials,
          claims: decoded
        }
      }, req.auth);
    } else {
      req.auth = xtend({
        jwt: false
      }, req.auth);
    }
  } catch(e) {
    return debug('it is not a JWT token');
  }
}

module.exports = HttpAuthParserBearer;
