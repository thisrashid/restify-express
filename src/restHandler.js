var wrench = require("./wrench");
var Logger = require('./logger');

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

  const logger = Logger(options);

  this.loadControllers = function() {
    var self = this;
    var controllers = self.options.controllers;

    wrench(controllers)
      .filter(file => {
        return /\.(js)$/i.test(file);
      })
      .map(file => {
        const ctrl = require(controllers + "/" + file);
        logger.yellow('Controller loaded: ' + controllers + "/" + file);
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

    let crudHandlers = [];
    Object.keys(ctrl).forEach(key => {
      var value = ctrl[key];
      if (key.match(/^__/)) return;

      if (typeof value === "function") {
        // const method = self.methods[key].method,
        //   mountPath = apiPath + self.methods[key].params;
        // logger.green('Route: ' + method + ' ' + mountPath);
        // app[method](
        //   mountPath,
        //   middlewares[key] || [],
        //   value
        // );
        crudHandlers.push(key);
      } else if (typeof value === "object") {
        const method = value.method.toLowerCase(),
          mountPath = apiPath + "/" + key + (value.params ? value.params : '');
        logger.green('Route: ' + method + ' ' + mountPath);
        app[method](
          mountPath,
          value.middlewares || middlewares[key] || [],
          value.handler
        );
      }
    });

    crudHandlers.map(key => {
      let value = ctrl[key];
      const method = self.methods[key].method,
        mountPath = apiPath + self.methods[key].params;
      logger.green('Route: ' + method + ' ' + mountPath);
      app[method](
        mountPath,
        middlewares[key] || [],
        value
      );
    });
  };

  this.loadControllers(options);
}

module.exports = RESTHandler;
