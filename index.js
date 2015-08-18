'use strict';

var chalk = require('chalk');
var spawn = require('cross-spawn');
var parse = require('parse-spawn-args').parse;

function executeCommand(cmd, args, cwd, cb) {
  console.log(chalk.yellow('Executing: ') + cmd + ' ' + args.join(' '));

  var child = spawn(cmd, args, {
    cwd: cwd
  });
  var result = '';

  child.stdout.on('data', function(buffer) {
    console.log(chalk.grey(buffer.toString()));
    result += buffer.toString();
  });

  child.stderr.on('data', function(buffer) {
    console.log(chalk.red(buffer.toString()));
  });

  child.stdout.on('end', function() {
    cb(result);
  });
}

/**
 * @param {Array<string>} cmds - An array of commands.
 * @param {String} cwd - The directory in which the commands
 *   will be executed.
 * @param {Function} [cb] - A callback to call once the commands were executed.
 * @example
 * var cwd =  path.resolve(process.cwd());
 * exec(['mkdir foo', 'rm -rf foo']);
 */
function exec(cmds, cwd, cb) {
  if (cmds && cmds.length) {
    var cmd = cmds.shift();
    var parts = parse(cmd);
    if (cmd.length > 0) {
      executeCommand(parts[0], parts.splice(1), cwd, function() {
        console.log(chalk.yellow('Finished: ') + cmd);
        exec(cmds, cwd, cb);
      });
    }
  } else {
    console.log(chalk.cyan('Finished executing the commands'));
    if (typeof cb === 'function') {
      cb();
    }
  }
}

module.exports = exec;
