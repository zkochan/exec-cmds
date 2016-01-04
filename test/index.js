'use strict';

const expect = require('chai').expect;
const execCmds = require('../');

describe('execCmds', function() {
  it('shoud successfully exec commands', function() {
    let spawned = execCmds([
      'mkdir foo',
      'rm -rf foo',
    ]);

    expect(spawned.error).to.not.exist;
  });

  it('shoud return error if one of the commands not exists', function() {
    let spawned = execCmds([
      'somecommandthatwillneverexist',
    ]);

    expect(spawned.error).to.be.an.instanceof(Error);
    expect(spawned.error.code).to.eq('ENOENT');
    expect(spawned.error.errno).to.eq('ENOENT');
  });
});
