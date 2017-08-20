module.exports = {
  index : function(req, res) {
      return res.successJson({'message' : 'successJson'});
  },
  read : function(req, res) {
      return res.errorJson({'message' : 'errorJson'});
  }
}
