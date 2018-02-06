const basic = require('./basic');
const bearer = require('./bearer');

const HttpAuthParser = function (req) {
  basic(req);
  bearer(req);
};

module.exports = HttpAuthParser;

