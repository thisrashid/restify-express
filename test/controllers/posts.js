var Post = {
  __NAME : 'posts',
  errorJson: {
    method: 'get',
    params: '',
    handler: function(req, res) {
        return res.errorJson({message: 'res.errorJson()'});
    }
  },
  index : function(req, res) {
      return res.successJson({'message' : 'This is index page'});
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
      params: '/:x/:y',
      handler: function(req, res) {
          return res.json(req.params);
      }
  }
}

module.exports = Post;