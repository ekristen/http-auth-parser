[![Build Status](https://travis-ci.org/ekristen/http-auth-parser.svg)](https://travis-ci.org/ekristen/http-auth-parser)

# http-auth-parser

This little library is used to parse and put the auth header data at `req.auth`. It can currently handle `basic` and `bearer` authentication types.

This has support for JWT tokens when `bearer` auth is being used. The token value will attempt to be parsed by the JWT parser. It ONLY does decode. If you would like to verify the token it is available at `req.auth.jwt.token`.

## Auth Object

```javascript
req.auth = {
  type: 'basic|bearer',
  username: 'username',
  password: 'password',
  token: 'token',
  jwt: {
    token: 'rawjwttoken',
    claims: 'Object of Claims from Token'
  }
}
```

## Example Code

```javascript
var authparser = require('http-auth-parser')

var http = require('http');
http.createServer(function (req, res) {
  authparser(req)

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(JSON.stringify(req.auth, null, 4));
}).listen(8000, '127.0.0.1');
```

`curl -XGET -H 'Authorization: Bearer mytoken' http://localhost:8000`

### Example Auth Object

```json
{
    "type": "basic",
    "username": "Aladdin",
    "password": "open sesame"
}
```
