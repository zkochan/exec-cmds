'use strict';

var chalk = require('chalk');
var spawn = require('cross-spawn');
var parse = require('parse-spawn-args').parse;

function executeCommand(cmd, args, cwd) {
  console.log(chalk.yellow('Executing: ') + cmd + ' ' + args.join(' '));

  spawn.sync(cmd, args, {
    cwd: cwd,
    stdio: 'inherit'
  });
}

/**
 * @param {Array<string>} cmds - An array of commands.
 * @param {String} cwd - The directory in which the commands
 *   will be executed.
 * @example
 * var cwd =  path.resolve(process.cwd());
 * exec(['mkdir foo', 'rm -rf foo'], cwd);
 */
function exec(cmds, cwd) {
  if (cmds && cmds.length) {
    var cmd = cmds.shift();
    var parts = parse(cmd);
    if (cmd.length > 0) {
      executeCommand(parts[0], parts.splice(1), cwd);
      console.log(chalk.yellow('Finished: ') + cmd);
      exec(cmds, cwd);
    }
    return;
  }
  console.log(chalk.cyan('Finished executing the commands'));
}

module.exports = exec;
