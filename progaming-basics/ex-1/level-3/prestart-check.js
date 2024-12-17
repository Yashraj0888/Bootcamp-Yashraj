const fs = require('fs');
const { execSync } = require('child_process');

if (!fs.existsSync('node_modules')) {
  console.log('node_modules directory is missing. Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
} else {
  console.log('node_modules directory is present. Proceeding to start...');
}
