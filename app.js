var express = require('express');
var bodyParser = require('body-parser');
var rest = require('./index');
var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(rest({
  controllers : __dirname + '/test/controllers',
  app: app,
  router: router,
  base: '/api'
}));

exports.server = app.listen(3001);
exports.app = app;
exports.router = router;