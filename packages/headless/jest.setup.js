const { jest } = require("@jest/globals");

global.__fbBatchedBridgeConfig = {};
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
