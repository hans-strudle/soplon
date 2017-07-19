'use strict';

const exec = require('child_process').exec,
      fs = require('fs');

function register(cb){
    cb = cb || console.log;
    process.on('uncaughtException', err => {
        fs.writeSync(1, err.stack + '\n');
        parseStack(err.stack, loc => {
            blame(loc, cb);
        })
    });
}

function blame(loc, cb){
    var cmd = 'git blame -L ' + loc.row + ',' + loc.row + ' ' + loc.file;
    exec(cmd, (err, stdout, stderr) => {
        if (err){
            console.log('Could not determine author of error!');
            cb(loc);
        } else {
            var bl = parseBlame(stdout);
            var full = Object.assign(loc, bl);
            cb(full);
        }
    });
}

function parseBlame(blame, cb){
    var parts = blame.split(' ');
    var rev = parts[0]; // rev is always first?
    for (var i = 1; i < parts.length - 1; i++){
        var isdate = (new Date(parts[i])) != 'Invalid Date';
        console.log(parts[i]);
        console.log(isdate);
    }
    var user = parts[1].substring(1, parts[1].length);
    var date = new Date(parts[2] + ' ' + parts[3]);
    var line = parts.slice(6).join(' ');
    return {rev: rev, line: line, user: user, date: date};
}

function parseStack(stack, cb){
    var loc = stack.match(/\(.+\)/g)[0]
    var locInfo = parseLocation(loc);
    locInfo.stack = stack;
    cb(locInfo);;
}

function parseLocation(loc){
    loc = loc.substring(1, loc.length - 1); // remove ()
    var parts = loc.split(':');
    return {file: parts[0], row: parts[1], col: parts[2]};
}

module.exports = {
    register: register,
    parseStack: parseStack,
    parseLocation: parseLocation,
    parseBlame: parseBlame,
    blame: blame
}
