# express-rest
Middleware to create REST APIs on express server

## Installation

  Works with Express 4.x.x

    npm install restify-express
    
    
## Usage
```javascript
var express = require('express');
var rest = ('restify-express');

var app = express();

app.use({
  controllers: __dirname + '/' + 'controllers',
  app: app,
  base: '/api'
});
```

Next is to create controllers in your controllers folder. Let's create posts.js file with below sample code:

```javascript
var Post = {
    __NAME : 'posts',
    index : function(req, res) {
        return res.json({'message' : 'This is index page'});
    },
    create : function(req, res) {
        return res.json({'message' : 'Create a new post'});
    },
    update : function(req, res) {
        return res.json({'message' : 'Update an existing post'});
    },
    read : function(req, res) {
        return res.json({'message' : 'read a post'});
    },
    destroy : function(req, res) {
        return res.json({'message' : 'Delete a post'});
    },
    custom: {
        method: 'get',
        params: '/:x',
        handler: function(req, res) {
            return res.json(req.params);
        }
    }
}

module.exports = Post;
```
__NAME is required field. If it is not present then entire file will get ignored.
