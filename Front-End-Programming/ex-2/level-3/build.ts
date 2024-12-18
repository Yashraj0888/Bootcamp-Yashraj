import * as childProcess from 'child_process';
import * as path from 'path';

function runBuild() {
  const tscPath = path.resolve('node_modules', '.bin', 'tsc');  // Path to TypeScript compiler
  
  const buildProcess = childProcess.spawn(tscPath, [], {
    stdio: 'inherit',  // Output to the console
    shell: true,
  });

  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Build completed successfully!');
    } else {
      console.error('Build failed.');
    }
  });
}

runBuild();
