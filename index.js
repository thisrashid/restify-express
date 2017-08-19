/**
 * This is a middleware to automate routing for REST APIs
 */

var RESTHandler = require('./src/restHandler');

function restMiddleware(options) {

    options.app.use(function(req, res, next) {
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
    });

    let rest = new RESTHandler(options);
    
    options.app.use(options.base + '/*', function(req, res, next) {
        next();
    });
    return function (req, res, next) {
        next();
    }
}

module.exports = restMiddleware;
