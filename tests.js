const soplon = require('./index.js');

const fakeTrace = '(~/Projects/soplon:4:5)';

soplon.parseStack(fakeTrace, console.log);

x();
