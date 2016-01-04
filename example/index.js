'use strict';

const execCmds = require('../');

execCmds([
  'mkdir foo',
  'rm -rf foo',
  'node write-env',
], {
  env: {
    FOO_BAR: 'Hello world!',
  },
});
