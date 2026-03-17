/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: { "$0": "jest", config: "e2e/jest.config.js" },
    jest: { setupTimeout: 120000 },
  },
  apps: {
    "ios.debug": {
      type: "ios.app",
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/RNUIExample.app",
      build:
        "xcodebuild -workspace ios/RNUIExample.xcworkspace -scheme RNUIExample -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
    },
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug",
      reversePorts: [8081],
    },
  },
  devices: {
    "ios.simulator": {
      type: "ios.simulator",
      device: { type: "iPhone 16 Pro" },
    },
    "android.emulator": {
      type: "android.emulator",
      device: { avdName: "Pixel_8_API_35" },
    },
  },
  configurations: {
    "ios.sim.debug": {
      device: "ios.simulator",
      app: "ios.debug",
    },
    "android.emu.debug": {
      device: "android.emulator",
      app: "android.debug",
    },
  },
};