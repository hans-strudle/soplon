'use strict';

const soplon = require('../soplon.js');

const https = require('https');

soplon.register(err => {
    var text = 'Error in: `' + err.file + '`\n';
        text += 'commit: `' + err.rev + '` author: `' + err.user + '`\n';
        text += '```' + err.stack + '```';
    var req = https.request({
        method: 'POST',
        host: process.env['RHOST'],
        path: '/hooks/' + process.env['RPATH'],
        headers: {'Content-Type': 'application/json'}
    })
    req.write(JSON.stringify({text: text}));
    req.end();
})

x();
