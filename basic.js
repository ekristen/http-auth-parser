var debug = require('debug')('http-auth-parser:parser:basic')

module.exports = function(req) {
  if (typeof req.headers['authorization'] == 'undefined') {
    // authorization does not exist
    debug('no authorization header found')
    return
  }

  var auth_header = req.headers['authorization']
  
  var auth_parts = auth_header.split(' ')
  
  if (auth_parts[0] != 'Basic') {
    // we aren't dealing with basic auth
    return debug('auth type not basic')
  }

  var auth_plain = new Buffer(auth_parts[1], 'base64').toString()
  var auth_creds = auth_plain.split(':')

  req.auth = {
    type: 'basic',
    username: auth_creds[0],
    password: auth_creds[1]
  }
  
  return req.auth
}
