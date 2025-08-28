#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const runCommand = (command, cwd, args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { 
      cwd,
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
};

const buildApp = async (appName) => {
  console.log(`🔨 Building ${appName}...`);
  const appPath = path.join(__dirname, '..', 'apps', appName);
  await runCommand('webpack', appPath, ['--mode', 'production']);
  console.log(`✅ ${appName} build completed`);
};

const main = async () => {
  try {
    console.log('🚀 Starting build process...');
    
    // Build apps in parallel or sequential based on preference
    const apps = ['shell', 'user-report', 'user-transaction', 'user-profile', 'app-user', 'user-avatar'];
    
    if (process.argv.includes('--parallel')) {
      await Promise.all(apps.map(app => buildApp(app)));
    } else {
      for (const app of apps) {
        await buildApp(app);
      }
    }
    
    console.log('🎉 All builds completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
};

main();