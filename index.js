'use strict';

const exec = require('child_process').exec;

process.on('uncaughtException', err => {
    console.log(err.stack);
    parseStack(err.stack, loc => {
        blame(loc, console.log);
    })
});

function blame(loc, cb){
    var cmd = 'git blame -L ' + loc.row + ',' + loc.row + ' ' + loc.file;
    exec(cmd, (err, stdout, stderr) => {
        if (err) console.log('Could not determine author of error!');
        console.log(stdout, stderr);
        parseBlame(stdout, cb);
    });
}

function parseBlame(blame, cb){
}

function parseStack(stack, cb){
    var locations = stack.match(/\(.+\)/g);
    locations = [locations[0]];
    locations.forEach(loc => {
        cb(parseLocation(loc));
    });
}

function parseLocation(loc){
    loc = loc.substring(1, loc.length - 1); // remove ()
    var parts = loc.split(':');
    return {file: parts[0], row: parts[1], col: parts[2]};
}

module.exports = {
    parseStack: parseStack,
    parseLocation: parseLocation
}
