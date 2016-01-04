# exec-cmds

Executes a list of commands.

[![Dependency Status](https://david-dm.org/zkochan/exec-cmds/status.svg?style=flat)](https://david-dm.org/zkochan/exec-cmds)
[![Build Status](http://img.shields.io/travis/zkochan/exec-cmds.svg?style=flat)](https://travis-ci.org/zkochan/exec-cmds)
[![npm version](https://badge.fury.io/js/exec-cmds.svg)](http://badge.fury.io/js/exec-cmds)


## Installation

```
npm install --save exec-cmds
```


## Usage example

```js
var execCmds = require('exec-cmds');

var cwd =  path.resolve(process.cwd());
var cmds = [
  'mkdir foo',
  'rm -rf foo'
];
execCmds(cmds, {
  cwd: cwd,
  env: {
    FOO_BAR: 'Hello world!'
  }
});
```


## License

MIT
