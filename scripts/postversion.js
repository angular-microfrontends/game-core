const { execSync } = require('child_process');
const { stdout } = require('./util');
const { version } = require('../package.json');

const execOptions = {
  cwd: 'projects/game-core',
  stdio: 'inherit',
};

stdout.write('Checking build tag...\n');
if (version && version.indexOf('-') > 0) {
  stdout.write('Removing build tag...\n');
  execSync(`git tag -d v${version}`, execOptions);
}
