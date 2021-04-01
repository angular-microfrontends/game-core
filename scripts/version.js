const { execSync } = require('child_process');
const { stdout } = require('./util');
const { version } = require('../package.json');

const execOptions = {
  cwd: 'projects/game-core',
  stdio: 'inherit',
};

stdout.write('Updating project version...\n');
execSync(`pnpm version ${version}`, execOptions);
execSync('git add .', execOptions);
