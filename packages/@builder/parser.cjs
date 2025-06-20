// @ts-nocheck
/* eslint-disable */

const path = require('path');
const fs = require('fs');

let tsconfigParsed = null;
function parseTsConfig() {
  if (parseTsConfig.__cached__) {
    return parseTsConfig.__cached__;
  }

  try {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
    const tsconfig = JSON.parse(tsconfigContent);
    
    const paths = tsconfig.compilerOptions?.paths;
    const parsed = {
      aliases: {}
    }
    
    // 1. Parse alias
    if (paths) {
      const baseUrl = tsconfig.compilerOptions?.baseUrl || '.';
      
      Object.entries(paths).forEach(([alias, pathArray]) => {
        if (pathArray && pathArray.length > 0) {
          const relativePath = pathArray[0];
          parsed.aliases[alias] = path.resolve(process.cwd(), baseUrl, relativePath);
        }
      });
    }

    parseTsConfig.__cached__ = parsed;

    return parsed;
  } catch (error) {
    console.warn('on reading tsconfig.json:', error.message);
    throw error;
  }
}

function getWorkspacePackages() {
  if (getWorkspacePackages.__cached__) {
    return workspacePackages.__cached__;
  }

  try {
    const workspacePackages = new Set();
    const packagesDir = path.join(process.cwd(), '..', '..', 'packages');

    if (fs.existsSync(packagesDir)) {
      const packageDirs = fs.readdirSync(packagesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      packageDirs.forEach(dirName => {
        try {
          const packageJsonPath = path.join(packagesDir, dirName, 'package.json');
          if (fs.existsSync(packageJsonPath)) {
            const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
            const packageJson = JSON.parse(packageJsonContent);
            if (packageJson.name) {
              workspacePackages.add(packageJson.name);
            }
          }
        } catch (error) {
          console.warn(`Failed to read package.json in packages/${dirName}:`, error.message);
        }
      });
    }

    getWorkspacePackages.__cached__ = workspacePackages;

    return workspacePackages;
  } catch (error) {
    console.warn('on reading pnpm-workspace.yaml:', error.message);
    throw error;
  }
}

function parsePackageJson() {
  if (parsePackageJson.__cached__) {
    return parsePackageJson.__cached__;
  }

  // 1. Parse dependencies
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    const parsed = { dependencies: [] };

    if (packageJson.dependencies) {
      const workspacePackageNames = getWorkspacePackages();
      parsed.dependencies = Object.keys(packageJson.dependencies).filter(dep => 
        !workspacePackageNames.has(dep)
      );
    }

    parsePackageJson.__cached__ = parsed;

    return parsed;
  } catch (error) {
    console.warn('on reading package.json:', error.message);
    throw error;
  }
}

module.exports = {
  parseTsConfig,
  parsePackageJson,
};
