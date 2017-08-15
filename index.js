/**
 * This is a middleware to automate routing for REST APIs
 */

var wrench =  require('./wrench');

function RESTHandler(options) {
    this.options = options;
    this.methods = {
        index: {
            method: 'get',
            params: ''
        },
        create: {
            method: 'post',
            params: ''
        },
        update: {
            method: 'put',
            params: ''
        },
        read: {
            method: 'get',
            params: '/:id'
        },
        destroy: {
            method: 'delete',
            params: ''
        }
    }
    

    this.loadControllers = function() {
        var self = this;
        var controllers = self.options.controllers;
        
        wrench(controllers)
            .filter((file) => {
                return (/\.(js)$/i).test(file);
            }).map((file) => {
                console.log('file: ', file);
                const ctrl = require(controllers + '/' + file);
                self.processController(ctrl.default ? ctrl.default : ctrl);
            });
    }

    this.processController = function(ctrl) {
        var self = this;
        let app = self.options.app;
        if(!ctrl.__NAME) {
            return;
        }
        const apiPath = self.options.base + '/' + ctrl.__NAME;
        
        Object.keys(ctrl).forEach((key) => {
            var value = ctrl[key];
            if(key.match(/^__/)) return;

            if(typeof value === 'function') {
                console.log(apiPath + self.methods[key].params)
                app[ self.methods[key].method ](apiPath + self.methods[key].params, value);
            } else if(typeof value === 'object') {
                console.log(apiPath + value.params);
                app[value.method.toLowerCase()](apiPath + value.params, value.handler);
            }
        });
    } 

    this.loadControllers(options);
}

function restMiddleware(options) {
    let rest = new RESTHandler(options);
    return function RESTServer(req, res, next) {
        next();
    }
}
module.exports = restMiddleware;
