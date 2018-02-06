const debug = require('debug')('http-auth-parser:basic');

module.exports = function (req) {
  if (typeof req.headers['authorization'] == 'undefined') {
    // authorization does not exist
    req.auth = null;
    return debug('no authorization header found');
  }

  const [ type, credentials ] = req.headers['authorization'].split(' ');

  if (type !== 'Basic') {
    // we aren't dealing with basic auth
    return debug('auth type not basic');
  }

  const auth_plain = new Buffer(credentials, 'base64').toString();
  const [ username, password ] = auth_plain.split(':');

  req.auth = {
    type: 'basic', username, password
  };

  return req.auth;
}
