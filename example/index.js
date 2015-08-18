'use strict';

var execCmds = require('../');

execCmds([
  'mkdir foo',
  'rm -rf foo'
]);
