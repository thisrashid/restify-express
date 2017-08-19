/*  wrench.js
 *
 *  A collection of various utility functions I've found myself in need of
 *  for use with Node.js (http://nodejs.org/). This includes things like:
 *
 *  - Recursively deleting directories in Node.js (Sync, not Async)
 *  - Recursively copying directories in Node.js (Sync, not Async)
 *  - Recursively chmoding a directory structure from Node.js (Sync, not Async)
 *  - Other things that I'll add here as time goes on. Shhhh...
 *
 *  ~ Ryan McGrath (ryan [at] venodesigns.net)
 */

var fs = require("fs"),
_path = require("path");

/*  wrench.readdirSyncRecursive("directory_path");
*
*  Recursively dives through directories and read the contents of all the
*  children directories.
*/
function readdirSyncRecursive(baseDir) {
    baseDir = baseDir.replace(/\/$/, '');

    var readdirSyncRecursive = function(baseDir) {
        var files = [],
            curFiles,
            nextDirs,
            isDir = function(fname){
                return fs.existsSync(_path.join(baseDir, fname)) ? fs.statSync( _path.join(baseDir, fname) ).isDirectory() : false;
            },
            prependBaseDir = function(fname){
                return _path.join(baseDir, fname);
            };

        curFiles = fs.readdirSync(baseDir);
        nextDirs = curFiles.filter(isDir);
        curFiles = curFiles.map(prependBaseDir);

        files = files.concat( curFiles );

        while (nextDirs.length) {
            files = files.concat( readdirSyncRecursive( _path.join(baseDir, nextDirs.shift()) ) );
        }

        return files;
    };

    // convert absolute paths to relative
    var fileList = readdirSyncRecursive(baseDir).map(function(val){
        return _path.relative(baseDir, val);
    });

    return fileList;
};

module.exports = readdirSyncRecursive;