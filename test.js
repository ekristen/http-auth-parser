var test = require('tape')
var parser = require('./parser')

test('basic authentication', function(t) {
  var req = {
    headers: {
      'authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
    }
  }

  parser(req) 

  t.equal(req.auth.type, 'basic')
  t.equal(req.auth.username, 'Aladdin')
  t.equal(req.auth.password, 'open sesame')
  t.end()
})


test('bearer authentication', function(t) {
  var req = {
    headers: {
      'authorization': 'Bearer thisisjustmytesttoken'
    }
  }

  parser(req)
  
  t.equal(req.auth.type, 'bearer')
  t.end()
})

test('bearer authentication jwt token', function(t) {
  var req = {
    headers: {
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    }
  }

  parser(req)

  t.equal(req.auth.type, 'bearer')
  t.equal(req.auth.jwt.claims.sub, '1234567890')
  t.equal(req.auth.jwt.claims.name, 'John Doe')
  t.equal(req.auth.jwt.claims.admin, true)
  t.end()
})
