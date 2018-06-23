var RESTHandler = require('../src/restHandler');
var supertest = require('supertest');
var router = require('../app').router;
var app = require('../app').app;

describe('restify-express', function() {
  var restHandler;
  beforeEach(function() {
    restHandler = new RESTHandler({
      controllers: __dirname + '/controllers',
      app: app,
      router: router,
      base: '/api'
    });
  });

  describe('RESTHandler creation with all configurations', function() {
    it('/posts/index', function(done) {
      supertest(app)
        .get('/api/posts')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          status: 'success',
          data: {
            message: 'This is index page'
          }
        })
        .end(done)
    });

    it('/posts/create', function(done) {
      supertest(app)
        .post('/api/posts')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          message: 'Create a new post'
        })
        .end(done)
    });

    it('/posts/update', function(done) {
      supertest(app)
        .put('/api/posts')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          message: 'Update an existing post'
        })
        .end(done)
    });

    it('/posts/destroy', function(done) {
      supertest(app)
        .delete('/api/posts')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          message: 'Delete a post'
        })
        .end(done)
    });

    it('/posts/read', function(done) {
      supertest(app)
        .get('/api/posts/1')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          message: 'read a post'
        })
        .end(done)
    });

    it('/posts/custom', function(done) {
      supertest(app)
        .get('/api/posts/custom/1/2')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          x: 1,
          y: 2
        })
        .end(done)
    });

    it('/posts/errorJson', function(done) {
      supertest(app)
        .get('/api/posts/errorJson')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(400, {
          status: 'error',
          data: {
            message: 'res.errorJson()'
          }
        })
        .end(done)
    });
  });

  describe('RESTHandler creation with with conventions', function() {
    it('/users/index', function(done) {
      supertest(app)
        .get('/api/users')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          status: 'success',
          data: {
            message: 'successJson'
          }
        })
        .end(done)
    });

    it('/users/read', function(done) {
      supertest(app)
        .get('/api/users/1')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(400, {
          status: 'error',
          data: {
            message: 'errorJson'
          }
        })
        .end(done)
    });

    it('/users/json200', function(done) {
      supertest(app)
        .get('/api/users/json200')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, {
          status: 'success',
          data: {
            message: 'json200'
          }
        })
        .end(done)
    });

    it('/users/json400', function(done) {
      supertest(app)
        .get('/api/users/json400')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(400, {
          status: 'bad_request',
          data: {
            message: 'json400'
          }
        })
        .end(done)
    });

    it('/users/json403', function(done) {
      supertest(app)
        .get('/api/users/json403')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(403, {
          status: 'unauthorized',
          data: {
            message: 'json403'
          }
        })
        .end(done)
    });

    it('/users/json404', function(done) {
      supertest(app)
        .get('/api/users/json404')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(404, {
          status: 'not_found',
          data: {
            message: 'json404'
          }
        })
        .end(done)
    });
  });
});