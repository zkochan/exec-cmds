'use strict';

var chalk = require('chalk');
var spawn = require('cross-spawn');
var parse = require('parse-spawn-args').parse;

function executeCommand(cmd, args, opts) {
  console.log(chalk.yellow('Executing: ') + cmd + ' ' + args.join(' '));

  spawn.sync(cmd, args, {
    cwd: opts.cwd,
    env: opts.env || process.env,
    stdio: 'inherit'
  });
}

/**
 * @param {Array<string>} cmds - An array of commands.
 * @param {Object} [opts]
 * @param {String} [opts.cwd] - The directory in which the commands
 *   will be executed.
 * @param {String} [opts.env=process.env] - Object Environment key-value pairs.
 * @example
 * var cwd =  path.resolve(process.cwd());
 * exec(['mkdir foo', 'rm -rf foo'], {
 *   cwd: cwd
 * });
 */
function exec(cmds, opts) {
  opts = opts || {};

  if (cmds && cmds.length) {
    var cmd = cmds.shift();
    var parts = parse(cmd);
    if (cmd.length > 0) {
      executeCommand(parts[0], parts.splice(1), opts);
      console.log(chalk.yellow('Finished: ') + cmd);
      exec(cmds, opts);
    }
    return;
  }
  console.log(chalk.cyan('Finished executing the commands'));
}

module.exports = exec;
