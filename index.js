/**
 * This is a middleware to automate routing for REST APIs
 */

var wrench =  require('./wrench');
var _ = ('lodash');

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
    this.loadControllers(options);

    this.loadControllers = function() {
        var self = this;
        var controllers = __dirname + '/' + this.options.controllers;
        readdirSyncRecursive(controllers)
            .filter((file) => {
                return (/\.(js)$/i).test(file);
            }).map((file) => {
                const ctrl = require(controllers + '/' + file);
                self.processController(ctrl.default ? ctrl.default : ctrl);
            });
    }

    processController(ctrl) {
        var self = this;
        let app = self.options.app;
        if(!ctrl.__NAME) {
            return;
        }
        const apiPath = self.options.base + '/' + ctrl.__NAME;
        
        _.map(ctrl, (value, key) => {
            if(key.match(/^__/)) return;

            if(typeof value === 'function') {
                app[ self.methods[key].method ](apiPath + self.methods[key].params, value);
            } else if(typeof value === 'object') {
                app[value.method.toLowerCase()](apiPath + value.params, value.handler);
            }
        });
    } 
}

function restMiddleware(options) {
    let rest = new RESTHandler(options);
    return function RESTServer(req, res, next) {
        next();
    }
}
export default restMiddleware;
