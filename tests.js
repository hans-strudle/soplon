const soplon = require('./soplon.js');

soplon.register();

const fakeTrace = '(~/Projects/soplon:4:5)';

soplon.parseStack(fakeTrace, console.log);

x();
