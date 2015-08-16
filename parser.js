var basic = require('./basic')
var bearer = require('./bearer')

var HttpAuthParser = function(req) {
  basic(req)
  bearer(req)
}

module.exports = HttpAuthParser

