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
                const ctrl = require(controllers + '/' + file);
                self.processController(ctrl.default ? ctrl.default : ctrl, file);
            });
    }

    this.processController = function(ctrl, fileName) {
        var self = this;
        let app = self.options.app;
        if(!ctrl.__NAME) {
            ctrl.__NAME = fileName.replace(/\.js/i, '');
        }
        const apiPath = self.options.base + '/' + ctrl.__NAME;
        
        Object.keys(ctrl).forEach((key) => {
            var value = ctrl[key];
            if(key.match(/^__/)) return;

            if(typeof value === 'function') {
                app[ self.methods[key].method ](apiPath + self.methods[key].params, value);
            } else if(typeof value === 'object') {
                app[value.method.toLowerCase()](apiPath + value.params, value.handler);
            }
        });
    } 

    this.loadControllers(options);
}

function restMiddleware(options) {
    let rest = new RESTHandler(options);
    
    options.app.use(options.base + '/*', function(req, res, next) {
        debugger;
        next();
    });
    return function (req, res, next) {
        res.successJson = function(json) {
            res.status(200).json({
                status: 'success',
                data: json
            });
        };
    
        res.errorJson = function(json) {
            res.status(400).json({
                status: 'error',
                data: json
            });
        }
        next();
    }
}
module.exports = restMiddleware;
