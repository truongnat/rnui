// Jest setup for Bun + React Native compatibility
// Mock React Native polyfills that cause issues with Bun's Jest runtime

// Mock the error-guard polyfill
global.nativeErrorGuard = global.nativeErrorGuard || ((callback) => callback());

// Mock React Native globals
global.__DEV__ = true;
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
