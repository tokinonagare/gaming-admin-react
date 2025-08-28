#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const runDevServer = (appName, port) => {
  return new Promise((resolve, reject) => {
    const appPath = path.join(__dirname, '..', 'apps', appName);
    console.log(`🚀 Starting ${appName} on http://localhost:${port}`);
    
    const child = spawn('webpack', ['serve', '--mode', 'development'], { 
      cwd: appPath,
      stdio: 'inherit',
      shell: true
    });
    
    child.on('error', reject);
    
    // Don't resolve - keep running
    setTimeout(resolve, 1000); // Give it a second to start
  });
};

const main = async () => {
  const appName = process.argv[2];
  
  if (!appName) {
    console.error('Usage: node serve.js <app-name>');
    console.log('Available apps: shell, gaming-admin');
    process.exit(1);
  }
  
  const ports = {
    'shell': 4200,
    'gaming-admin': 4201
  };
  
  const port = ports[appName];
  
  if (!port) {
    console.error(`Unknown app: ${appName}`);
    console.log('Available apps:', Object.keys(ports).join(', '));
    process.exit(1);
  }
  
  try {
    await runDevServer(appName, port);
  } catch (error) {
    console.error('❌ Failed to start dev server:', error.message);
    process.exit(1);
  }
};

main();