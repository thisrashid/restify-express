/**
 * This is a middleware to automate routing for REST APIs
 */

var RESTHandler = require('./src/restHandler');
var Logger = require('./src/logger');

function restMiddleware(options) {
    const logger = Logger(options);

    options.app.use(function(req, res, next) {
        logger.green('res.successJson() is registered');
        res.successJson = function(json) {
            res.status(200).json({
                status: 'success',
                data: json
            });
        };

        logger.green('res.successJson() is registered');
        res.errorJson = function(json) {
            res.status(400).json({
                status: 'error',
                data: json
            });
        }

        res.json200 = function(json) {
            res.status(200).json({
                status: 'success',
                data: json
            });
        };
    
        res.json404 = function(json) {
            res.status(404).json({
                status: 'not_found',
                data: json
            });
        };
    
        res.json403 = function(json) {
            res.status(403).json({
                status: 'unauthorized',
                data: json
            });
        };
    
        res.json400 = function(json) {
            res.status(400).json({
                status: 'bad_request',
                data: json
            });
        };
        next();
    });

    // register CRUD and other api routes
    new RESTHandler(options);
    
    options.app.use(options.base + '/*', function(req, res, next) {
        next();
    });
    return function (req, res, next) {
        next();
    }
}

module.exports = restMiddleware;
