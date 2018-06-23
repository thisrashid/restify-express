module.exports = {
  index : function(req, res) {
      return res.successJson({'message' : 'successJson'});
  },
  read : function(req, res) {
      return res.errorJson({'message' : 'errorJson'});
  },
  json200 : {
    method : 'get',
    handler : function(req, res) {
      return res.json200({'message' : 'json200'});
    }
  },
  json400 : {
    method : 'get',
    handler : function(req, res) {
      return res.json400({'message' : 'json400'});
    }
  },
  json403 : {
    method : 'get',
    handler : function(req, res) {
      return res.json403({'message' : 'json403'});
    }
  },
  json404 : {
    method : 'get',
    handler : function(req, res) {
      return res.json404({'message' : 'json404'});
    }
  }
}
