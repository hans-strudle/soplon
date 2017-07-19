const soplon = require('./soplon.js');

soplon.register();

const fakeFn = '(~/Projects/soplon:4:5)';
const fakeTrace = `ReferenceError: y is not defined
    at Object.<anonymous> (/Users/master/Projects/soplon/tests.js:9:1)
            at Module._compile (module.js:571:32)
            at Object.Module._extensions..js (module.js:580:10)
            at Module.load (module.js:488:32)
            at tryModuleLoad (module.js:447:12)
            at Function.Module._load (module.js:439:3)
            at Module.runMain (module.js:605:10)
            at run (bootstrap_node.js:423:7)
            at startup (bootstrap_node.js:147:9)
            at bootstrap_node.js:538:3`

const blame = "00000000 (Not Committed Yet 2017-06-18 14:51:19 -0700 32)     var parts = blame.replace(/(\\()/g, \'*_*\').split(\'*_*\');\n'"

soplon.parseStack(fakeTrace, info => {
    soplon.blame(info, blame => {
    })            
});

console.log(soplon.parseBlame(blame));
