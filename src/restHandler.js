var wrench = require("./wrench");

function RESTHandler(options) {
  this.options = options;
  this.methods = {
    index: {
      method: "get",
      params: ""
    },
    create: {
      method: "post",
      params: ""
    },
    update: {
      method: "put",
      params: ""
    },
    read: {
      method: "get",
      params: "/:id"
    },
    destroy: {
      method: "delete",
      params: ""
    }
  };

  this.loadControllers = function() {
    var self = this;
    var controllers = self.options.controllers;

    wrench(controllers)
      .filter(file => {
        return /\.(js)$/i.test(file);
      })
      .map(file => {
        const ctrl = require(controllers + "/" + file);
        self.processController(ctrl.default ? ctrl.default : ctrl, file);
      });
    self.options.app.use(self.options.base, self.options.router);
  };

  this.processController = function(ctrl, fileName) {
    var self = this,
      middlewares;
    var app = self.options.router || self.options.app;
    if (!app) {
      throw new Error("A reference of express app or router is not provided");
      return;
    }
    if (!ctrl.__NAME) {
      ctrl.__NAME = fileName.replace(/\.js/i, "");
    }
    middlewares = ctrl.__middlewares || {};
    var apiPath = self.options.router
      ? "/" + ctrl.__NAME
      : self.options.base + "/" + ctrl.__NAME;

    Object.keys(ctrl).forEach(key => {
      var value = ctrl[key];
      if (key.match(/^__/)) return;

      if (typeof value === "function") {
        app[self.methods[key].method](
          apiPath + self.methods[key].params,
          middlewares[key] || [],
          value
        );
      } else if (typeof value === "object") {
        app[value.method.toLowerCase()](
          apiPath + "/" + key + value.params,
          value.middlewares || middlewares[key] || [],
          value.handler
        );
      }
    });
  };

  this.loadControllers(options);
}

module.exports = RESTHandler;
