var debug = require('debug')('http-auth-parser:parser:bearer')
var xtend = require('xtend')
var jwt = require('jsonwebtoken')

var HttpAuthParserBearer = function(req) {

  if (typeof req.headers['authorization'] == 'undefined') {
    return debug('authorization header is missing')
  }

  var auth_parts = req.headers['authorization'].split(' ')

  if (auth_parts[0] != 'Bearer') {
    return debug('authorization header is not bearer')
  }

  try { 
    var decoded = jwt.decode(auth_parts[1])
  } catch(e) {
    debug('it is not a JWT token')
    return
  }

  req.auth = xtend({
    type: 'bearer',
    token: auth_parts[1],
    jwt: {
      token: auth_parts[1],
      claims: decoded
    } || false
  }, req.auth)
}

module.exports = HttpAuthParserBearer
