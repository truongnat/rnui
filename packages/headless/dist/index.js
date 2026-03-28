"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// ../../node_modules/expo-modules-core/src/errors/CodedError.ts
var CodedError;
var init_CodedError = __esm({
  "../../node_modules/expo-modules-core/src/errors/CodedError.ts"() {
    "use strict";
    CodedError = class extends Error {
      constructor(code2, message) {
        super(message);
        this.code = code2;
      }
    };
  }
});

// ../../node_modules/expo-modules-core/src/NativeModulesProxy.ts
var NativeModulesProxy_default;
var init_NativeModulesProxy = __esm({
  "../../node_modules/expo-modules-core/src/NativeModulesProxy.ts"() {
    "use strict";
    NativeModulesProxy_default = {};
  }
});

// ../../node_modules/expo-modules-core/src/TurboModuleToExpoModuleProxy.ts
function createTurboModuleToExpoProxy(turboModule, name) {
  return null;
}
var init_TurboModuleToExpoModuleProxy = __esm({
  "../../node_modules/expo-modules-core/src/TurboModuleToExpoModuleProxy.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo-modules-core/src/ensureNativeModulesAreInstalled.ts
function ensureNativeModulesAreInstalled() {
}
var init_ensureNativeModulesAreInstalled = __esm({
  "../../node_modules/expo-modules-core/src/ensureNativeModulesAreInstalled.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo-modules-core/src/requireNativeModule.ts
function requireNativeModule(moduleName) {
  const nativeModule = requireOptionalNativeModule(moduleName);
  if (!nativeModule) {
    throw new Error(`Cannot find native module '${moduleName}'`);
  }
  return nativeModule;
}
function requireOptionalNativeModule(moduleName) {
  ensureNativeModulesAreInstalled();
  try {
    return globalThis.expo?.modules?.[moduleName] ?? NativeModulesProxy_default[moduleName] ?? createTurboModuleToExpoProxy(import_react_native2.TurboModuleRegistry.get(moduleName), moduleName) ?? null;
  } catch (e) {
    const error = e;
    console.warn(`An error occurred while requiring the '${moduleName}' module: ${error.message}`);
    return null;
  }
}
var import_react_native2;
var init_requireNativeModule = __esm({
  "../../node_modules/expo-modules-core/src/requireNativeModule.ts"() {
    "use strict";
    import_react_native2 = require("react-native");
    init_NativeModulesProxy();
    init_TurboModuleToExpoModuleProxy();
    init_ensureNativeModulesAreInstalled();
  }
});

// ../../node_modules/expo-modules-core/src/sweet/setUpJsLogger.fx.ts
var init_setUpJsLogger_fx = __esm({
  "../../node_modules/expo-modules-core/src/sweet/setUpJsLogger.fx.ts"() {
    "use strict";
    init_CodedError();
    init_requireNativeModule();
    if (__DEV__ && typeof window !== "undefined" && (process.env.EXPO_OS === "android" || process.env.EXPO_OS === "ios")) {
      const NativeJSLogger = requireOptionalNativeModule("ExpoModulesCoreJSLogger");
      if (NativeJSLogger) {
        const onNewException = {
          eventName: "ExpoModulesCoreJSLogger.onNewError",
          action: console.error
        };
        const onNewWarning = {
          eventName: "ExpoModulesCoreJSLogger.onNewWarning",
          action: console.warn
        };
        const onNewDebug = {
          eventName: "ExpoModulesCoreJSLogger.onNewDebug",
          action: console.debug
        };
        const onNewInfo = {
          eventName: "ExpoModulesCoreJSLogger.onNewInfo",
          action: console.info
        };
        const onNewTrace = {
          eventName: "ExpoModulesCoreJSLogger.onNewTrace",
          action: console.trace
        };
        const listeners = [
          onNewException,
          onNewWarning,
          onNewDebug,
          onNewInfo,
          onNewTrace
        ];
        for (const listener of listeners) {
          NativeJSLogger.addListener(listener.eventName, ({ message }) => {
            listener.action(message);
          });
        }
      }
    }
    globalThis.ExpoModulesCore_CodedError = CodedError;
  }
});

// ../../node_modules/expo-modules-core/src/environment/browser.ts
var isDOMAvailable, canUseEventListeners, canUseViewport, isAsyncDebugging;
var init_browser = __esm({
  "../../node_modules/expo-modules-core/src/environment/browser.ts"() {
    "use strict";
    isDOMAvailable = false;
    canUseEventListeners = false;
    canUseViewport = false;
    isAsyncDebugging = false;
    if (__DEV__) {
      isAsyncDebugging = !global.nativeExtensions && !global.nativeCallSyncHook && !global.RN$Bridgeless;
    }
  }
});

// ../../node_modules/expo-modules-core/src/Platform.ts
var import_react_native3, nativeSelect, Platform, Platform_default;
var init_Platform = __esm({
  "../../node_modules/expo-modules-core/src/Platform.ts"() {
    "use strict";
    import_react_native3 = require("react-native");
    init_browser();
    if (__DEV__ && typeof process.env.EXPO_OS === "undefined") {
      console.warn(
        `The global process.env.EXPO_OS is not defined. This should be inlined by babel-preset-expo during transformation.`
      );
    }
    nativeSelect = typeof window !== "undefined" ? import_react_native3.Platform.select : (
      // process.env.EXPO_OS is injected by `babel-preset-expo` and available in both client and `react-server` environments.
      // Opt to use the env var when possible, and fallback to the React Native Platform module when it's not (arbitrary bundlers and transformers).
      function select(specifics) {
        if (!process.env.EXPO_OS) return void 0;
        if (specifics.hasOwnProperty(process.env.EXPO_OS)) {
          return specifics[process.env.EXPO_OS];
        } else if (process.env.EXPO_OS !== "web" && specifics.hasOwnProperty("native")) {
          return specifics.native;
        } else if (specifics.hasOwnProperty("default")) {
          return specifics.default;
        }
        return void 0;
      }
    );
    Platform = {
      /**
       * Denotes the currently running platform.
       * Can be one of ios, android, web.
       */
      OS: process.env.EXPO_OS || import_react_native3.Platform.OS,
      /**
       * Returns the value with the matching platform.
       * Object keys can be any of ios, android, native, web, default.
       *
       * @ios ios, native, default
       * @android android, native, default
       * @web web, default
       */
      select: nativeSelect,
      /**
       * Denotes if the DOM API is available in the current environment.
       * The DOM is not available in native React runtimes and Node.js.
       */
      isDOMAvailable,
      /**
       * Denotes if the current environment can attach event listeners
       * to the window. This will return false in native React
       * runtimes and Node.js.
       */
      canUseEventListeners,
      /**
       * Denotes if the current environment can inspect properties of the
       * screen on which the current window is being rendered. This will
       * return false in native React runtimes and Node.js.
       */
      canUseViewport,
      /**
       * If the JavaScript is being executed in a remote JavaScript environment.
       * When `true`, synchronous native invocations cannot be executed.
       */
      isAsyncDebugging
    };
    Platform_default = Platform;
  }
});

// ../../node_modules/expo-modules-core/src/errors/UnavailabilityError.ts
var UnavailabilityError;
var init_UnavailabilityError = __esm({
  "../../node_modules/expo-modules-core/src/errors/UnavailabilityError.ts"() {
    "use strict";
    init_CodedError();
    init_Platform();
    UnavailabilityError = class extends CodedError {
      constructor(moduleName, propertyName) {
        super(
          "ERR_UNAVAILABLE",
          `The method or property ${moduleName}.${propertyName} is not available on ${Platform_default.OS}, are you sure you've linked all the native dependencies properly?`
        );
      }
    };
  }
});

// ../../node_modules/expo-modules-core/src/registerWebModule.ts
var init_registerWebModule = __esm({
  "../../node_modules/expo-modules-core/src/registerWebModule.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo-modules-core/src/TypedArrays.types.ts
var init_TypedArrays_types = __esm({
  "../../node_modules/expo-modules-core/src/TypedArrays.types.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo-modules-core/src/PermissionsInterface.ts
var init_PermissionsInterface = __esm({
  "../../node_modules/expo-modules-core/src/PermissionsInterface.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo-modules-core/src/PermissionsHook.ts
var import_react2;
var init_PermissionsHook = __esm({
  "../../node_modules/expo-modules-core/src/PermissionsHook.ts"() {
    "use strict";
    "use client";
    import_react2 = require("react");
  }
});

// ../../node_modules/expo-modules-core/src/Refs.ts
var import_react3;
var init_Refs = __esm({
  "../../node_modules/expo-modules-core/src/Refs.ts"() {
    "use strict";
    import_react3 = require("react");
  }
});

// ../../node_modules/expo-modules-core/src/hooks/useReleasingSharedObject.ts
var import_react4;
var init_useReleasingSharedObject = __esm({
  "../../node_modules/expo-modules-core/src/hooks/useReleasingSharedObject.ts"() {
    "use strict";
    "use client";
    import_react4 = require("react");
  }
});

// ../../node_modules/expo-modules-core/src/reload.ts
var init_reload = __esm({
  "../../node_modules/expo-modules-core/src/reload.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo-modules-core/src/index.ts
var init_src = __esm({
  "../../node_modules/expo-modules-core/src/index.ts"() {
    "use strict";
    init_setUpJsLogger_fx();
    init_Platform();
    init_requireNativeModule();
    init_registerWebModule();
    init_TypedArrays_types();
    init_PermissionsInterface();
    init_PermissionsHook();
    init_Refs();
    init_useReleasingSharedObject();
    init_reload();
    init_UnavailabilityError();
  }
});

// ../../node_modules/expo/node_modules/react-refresh/cjs/react-refresh-runtime.production.min.js
var require_react_refresh_runtime_production_min = __commonJS({
  "../../node_modules/expo/node_modules/react-refresh/cjs/react-refresh-runtime.production.min.js"() {
    "use strict";
    throw Error("React Refresh runtime should not be included in the production bundle.");
  }
});

// ../../node_modules/expo/node_modules/react-refresh/cjs/react-refresh-runtime.development.js
var require_react_refresh_runtime_development = __commonJS({
  "../../node_modules/expo/node_modules/react-refresh/cjs/react-refresh-runtime.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
        var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        var allFamiliesByID = /* @__PURE__ */ new Map();
        var allFamiliesByType = new PossiblyWeakMap();
        var allSignaturesByType = new PossiblyWeakMap();
        var updatedFamiliesByType = new PossiblyWeakMap();
        var pendingUpdates = [];
        var helpersByRendererID = /* @__PURE__ */ new Map();
        var helpersByRoot = /* @__PURE__ */ new Map();
        var mountedRoots = /* @__PURE__ */ new Set();
        var failedRoots = /* @__PURE__ */ new Set();
        var rootElements = (
          // $FlowIssue
          typeof WeakMap === "function" ? /* @__PURE__ */ new WeakMap() : null
        );
        var isPerformingRefresh = false;
        function computeFullKey(signature) {
          if (signature.fullKey !== null) {
            return signature.fullKey;
          }
          var fullKey = signature.ownKey;
          var hooks;
          try {
            hooks = signature.getCustomHooks();
          } catch (err) {
            signature.forceReset = true;
            signature.fullKey = fullKey;
            return fullKey;
          }
          for (var i = 0; i < hooks.length; i++) {
            var hook = hooks[i];
            if (typeof hook !== "function") {
              signature.forceReset = true;
              signature.fullKey = fullKey;
              return fullKey;
            }
            var nestedHookSignature = allSignaturesByType.get(hook);
            if (nestedHookSignature === void 0) {
              continue;
            }
            var nestedHookKey = computeFullKey(nestedHookSignature);
            if (nestedHookSignature.forceReset) {
              signature.forceReset = true;
            }
            fullKey += "\n---\n" + nestedHookKey;
          }
          signature.fullKey = fullKey;
          return fullKey;
        }
        function haveEqualSignatures(prevType, nextType) {
          var prevSignature = allSignaturesByType.get(prevType);
          var nextSignature = allSignaturesByType.get(nextType);
          if (prevSignature === void 0 && nextSignature === void 0) {
            return true;
          }
          if (prevSignature === void 0 || nextSignature === void 0) {
            return false;
          }
          if (computeFullKey(prevSignature) !== computeFullKey(nextSignature)) {
            return false;
          }
          if (nextSignature.forceReset) {
            return false;
          }
          return true;
        }
        function isReactClass(type) {
          return type.prototype && type.prototype.isReactComponent;
        }
        function canPreserveStateBetween(prevType, nextType) {
          if (isReactClass(prevType) || isReactClass(nextType)) {
            return false;
          }
          if (haveEqualSignatures(prevType, nextType)) {
            return true;
          }
          return false;
        }
        function resolveFamily(type) {
          return updatedFamiliesByType.get(type);
        }
        function cloneMap(map) {
          var clone = /* @__PURE__ */ new Map();
          map.forEach(function(value, key) {
            clone.set(key, value);
          });
          return clone;
        }
        function cloneSet(set) {
          var clone = /* @__PURE__ */ new Set();
          set.forEach(function(value) {
            clone.add(value);
          });
          return clone;
        }
        function getProperty(object, property) {
          try {
            return object[property];
          } catch (err) {
            return void 0;
          }
        }
        function performReactRefresh() {
          if (pendingUpdates.length === 0) {
            return null;
          }
          if (isPerformingRefresh) {
            return null;
          }
          isPerformingRefresh = true;
          try {
            var staleFamilies = /* @__PURE__ */ new Set();
            var updatedFamilies = /* @__PURE__ */ new Set();
            var updates = pendingUpdates;
            pendingUpdates = [];
            updates.forEach(function(_ref) {
              var family = _ref[0], nextType = _ref[1];
              var prevType = family.current;
              updatedFamiliesByType.set(prevType, family);
              updatedFamiliesByType.set(nextType, family);
              family.current = nextType;
              if (canPreserveStateBetween(prevType, nextType)) {
                updatedFamilies.add(family);
              } else {
                staleFamilies.add(family);
              }
            });
            var update = {
              updatedFamilies,
              // Families that will re-render preserving state
              staleFamilies
              // Families that will be remounted
            };
            helpersByRendererID.forEach(function(helpers) {
              helpers.setRefreshHandler(resolveFamily);
            });
            var didError = false;
            var firstError = null;
            var failedRootsSnapshot = cloneSet(failedRoots);
            var mountedRootsSnapshot = cloneSet(mountedRoots);
            var helpersByRootSnapshot = cloneMap(helpersByRoot);
            failedRootsSnapshot.forEach(function(root) {
              var helpers = helpersByRootSnapshot.get(root);
              if (helpers === void 0) {
                throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
              }
              if (!failedRoots.has(root)) {
              }
              if (rootElements === null) {
                return;
              }
              if (!rootElements.has(root)) {
                return;
              }
              var element = rootElements.get(root);
              try {
                helpers.scheduleRoot(root, element);
              } catch (err) {
                if (!didError) {
                  didError = true;
                  firstError = err;
                }
              }
            });
            mountedRootsSnapshot.forEach(function(root) {
              var helpers = helpersByRootSnapshot.get(root);
              if (helpers === void 0) {
                throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
              }
              if (!mountedRoots.has(root)) {
              }
              try {
                helpers.scheduleRefresh(root, update);
              } catch (err) {
                if (!didError) {
                  didError = true;
                  firstError = err;
                }
              }
            });
            if (didError) {
              throw firstError;
            }
            return update;
          } finally {
            isPerformingRefresh = false;
          }
        }
        function register(type, id2) {
          {
            if (type === null) {
              return;
            }
            if (typeof type !== "function" && typeof type !== "object") {
              return;
            }
            if (allFamiliesByType.has(type)) {
              return;
            }
            var family = allFamiliesByID.get(id2);
            if (family === void 0) {
              family = {
                current: type
              };
              allFamiliesByID.set(id2, family);
            } else {
              pendingUpdates.push([family, type]);
            }
            allFamiliesByType.set(type, family);
            if (typeof type === "object" && type !== null) {
              switch (getProperty(type, "$$typeof")) {
                case REACT_FORWARD_REF_TYPE:
                  register(type.render, id2 + "$render");
                  break;
                case REACT_MEMO_TYPE:
                  register(type.type, id2 + "$type");
                  break;
              }
            }
          }
        }
        function setSignature(type, key) {
          var forceReset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          var getCustomHooks = arguments.length > 3 ? arguments[3] : void 0;
          {
            if (!allSignaturesByType.has(type)) {
              allSignaturesByType.set(type, {
                forceReset,
                ownKey: key,
                fullKey: null,
                getCustomHooks: getCustomHooks || function() {
                  return [];
                }
              });
            }
            if (typeof type === "object" && type !== null) {
              switch (getProperty(type, "$$typeof")) {
                case REACT_FORWARD_REF_TYPE:
                  setSignature(type.render, key, forceReset, getCustomHooks);
                  break;
                case REACT_MEMO_TYPE:
                  setSignature(type.type, key, forceReset, getCustomHooks);
                  break;
              }
            }
          }
        }
        function collectCustomHooksForSignature(type) {
          {
            var signature = allSignaturesByType.get(type);
            if (signature !== void 0) {
              computeFullKey(signature);
            }
          }
        }
        function getFamilyByID(id2) {
          {
            return allFamiliesByID.get(id2);
          }
        }
        function getFamilyByType(type) {
          {
            return allFamiliesByType.get(type);
          }
        }
        function findAffectedHostInstances(families) {
          {
            var affectedInstances = /* @__PURE__ */ new Set();
            mountedRoots.forEach(function(root) {
              var helpers = helpersByRoot.get(root);
              if (helpers === void 0) {
                throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
              }
              var instancesForRoot = helpers.findHostInstancesForRefresh(root, families);
              instancesForRoot.forEach(function(inst) {
                affectedInstances.add(inst);
              });
            });
            return affectedInstances;
          }
        }
        function injectIntoGlobalHook(globalObject) {
          {
            var hook = globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (hook === void 0) {
              var nextID = 0;
              globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__ = hook = {
                renderers: /* @__PURE__ */ new Map(),
                supportsFiber: true,
                inject: function(injected) {
                  return nextID++;
                },
                onScheduleFiberRoot: function(id2, root, children) {
                },
                onCommitFiberRoot: function(id2, root, maybePriorityLevel, didError) {
                },
                onCommitFiberUnmount: function() {
                }
              };
            }
            if (hook.isDisabled) {
              console["warn"]("Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). Fast Refresh is not compatible with this shim and will be disabled.");
              return;
            }
            var oldInject = hook.inject;
            hook.inject = function(injected) {
              var id2 = oldInject.apply(this, arguments);
              if (typeof injected.scheduleRefresh === "function" && typeof injected.setRefreshHandler === "function") {
                helpersByRendererID.set(id2, injected);
              }
              return id2;
            };
            hook.renderers.forEach(function(injected, id2) {
              if (typeof injected.scheduleRefresh === "function" && typeof injected.setRefreshHandler === "function") {
                helpersByRendererID.set(id2, injected);
              }
            });
            var oldOnCommitFiberRoot = hook.onCommitFiberRoot;
            var oldOnScheduleFiberRoot = hook.onScheduleFiberRoot || function() {
            };
            hook.onScheduleFiberRoot = function(id2, root, children) {
              if (!isPerformingRefresh) {
                failedRoots.delete(root);
                if (rootElements !== null) {
                  rootElements.set(root, children);
                }
              }
              return oldOnScheduleFiberRoot.apply(this, arguments);
            };
            hook.onCommitFiberRoot = function(id2, root, maybePriorityLevel, didError) {
              var helpers = helpersByRendererID.get(id2);
              if (helpers !== void 0) {
                helpersByRoot.set(root, helpers);
                var current = root.current;
                var alternate = current.alternate;
                if (alternate !== null) {
                  var wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null && mountedRoots.has(root);
                  var isMounted = current.memoizedState != null && current.memoizedState.element != null;
                  if (!wasMounted && isMounted) {
                    mountedRoots.add(root);
                    failedRoots.delete(root);
                  } else if (wasMounted && isMounted) ;
                  else if (wasMounted && !isMounted) {
                    mountedRoots.delete(root);
                    if (didError) {
                      failedRoots.add(root);
                    } else {
                      helpersByRoot.delete(root);
                    }
                  } else if (!wasMounted && !isMounted) {
                    if (didError) {
                      failedRoots.add(root);
                    }
                  }
                } else {
                  mountedRoots.add(root);
                }
              }
              return oldOnCommitFiberRoot.apply(this, arguments);
            };
          }
        }
        function hasUnrecoverableErrors() {
          return false;
        }
        function _getMountedRootCount() {
          {
            return mountedRoots.size;
          }
        }
        function createSignatureFunctionForTransform() {
          {
            var savedType;
            var hasCustomHooks;
            var didCollectHooks = false;
            return function(type, key, forceReset, getCustomHooks) {
              if (typeof key === "string") {
                if (!savedType) {
                  savedType = type;
                  hasCustomHooks = typeof getCustomHooks === "function";
                }
                if (type != null && (typeof type === "function" || typeof type === "object")) {
                  setSignature(type, key, forceReset, getCustomHooks);
                }
                return type;
              } else {
                if (!didCollectHooks && hasCustomHooks) {
                  didCollectHooks = true;
                  collectCustomHooksForSignature(savedType);
                }
              }
            };
          }
        }
        function isLikelyComponentType(type) {
          {
            switch (typeof type) {
              case "function": {
                if (type.prototype != null) {
                  if (type.prototype.isReactComponent) {
                    return true;
                  }
                  var ownNames = Object.getOwnPropertyNames(type.prototype);
                  if (ownNames.length > 1 || ownNames[0] !== "constructor") {
                    return false;
                  }
                  if (type.prototype.__proto__ !== Object.prototype) {
                    return false;
                  }
                }
                var name = type.name || type.displayName;
                return typeof name === "string" && /^[A-Z]/.test(name);
              }
              case "object": {
                if (type != null) {
                  switch (getProperty(type, "$$typeof")) {
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_MEMO_TYPE:
                      return true;
                    default:
                      return false;
                  }
                }
                return false;
              }
              default: {
                return false;
              }
            }
          }
        }
        exports2._getMountedRootCount = _getMountedRootCount;
        exports2.collectCustomHooksForSignature = collectCustomHooksForSignature;
        exports2.createSignatureFunctionForTransform = createSignatureFunctionForTransform;
        exports2.findAffectedHostInstances = findAffectedHostInstances;
        exports2.getFamilyByID = getFamilyByID;
        exports2.getFamilyByType = getFamilyByType;
        exports2.hasUnrecoverableErrors = hasUnrecoverableErrors;
        exports2.injectIntoGlobalHook = injectIntoGlobalHook;
        exports2.isLikelyComponentType = isLikelyComponentType;
        exports2.performReactRefresh = performReactRefresh;
        exports2.register = register;
        exports2.setSignature = setSignature;
      })();
    }
  }
});

// ../../node_modules/expo/node_modules/react-refresh/runtime.js
var require_runtime = __commonJS({
  "../../node_modules/expo/node_modules/react-refresh/runtime.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_refresh_runtime_production_min();
    } else {
      module2.exports = require_react_refresh_runtime_development();
    }
  }
});

// ../../node_modules/expo/src/async-require/setupFastRefresh.ts
var require_setupFastRefresh = __commonJS({
  "../../node_modules/expo/src/async-require/setupFastRefresh.ts"() {
    "use strict";
    var ReactRefreshRuntime = require_runtime();
    ReactRefreshRuntime.injectIntoGlobalHook(globalThis);
    var Refresh = {
      performFullRefresh() {
        location.reload();
      },
      createSignatureFunctionForTransform: ReactRefreshRuntime.createSignatureFunctionForTransform,
      isLikelyComponentType: ReactRefreshRuntime.isLikelyComponentType,
      getFamilyByType: ReactRefreshRuntime.getFamilyByType,
      register: ReactRefreshRuntime.register,
      performReactRefresh() {
        if (ReactRefreshRuntime.hasUnrecoverableErrors()) {
          location.reload();
          return;
        }
        ReactRefreshRuntime.performReactRefresh();
      }
    };
    globalThis[(globalThis.__METRO_GLOBAL_PREFIX__ ?? "") + "__ReactRefresh"] = Refresh;
  }
});

// ../../node_modules/@expo/metro/node_modules/metro-runtime/src/modules/vendor/eventemitter3.js
var require_eventemitter3 = __commonJS({
  "../../node_modules/@expo/metro/node_modules/metro-runtime/src/modules/vendor/eventemitter3.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter3.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter3.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter3;
    }
  }
});

// ../../node_modules/@expo/metro/node_modules/metro-runtime/src/modules/HMRClient.js
var require_HMRClient = __commonJS({
  "../../node_modules/@expo/metro/node_modules/metro-runtime/src/modules/HMRClient.js"(exports, module) {
    "use strict";
    var EventEmitter = require_eventemitter3();
    var inject = ({ module: [id, code], sourceURL }) => {
      if (global.globalEvalWithSourceUrl) {
        global.globalEvalWithSourceUrl(code, sourceURL);
      } else {
        eval(code);
      }
    };
    var injectUpdate = (update) => {
      update.added.forEach(inject);
      update.modified.forEach(inject);
    };
    var HMRClient = class extends EventEmitter {
      constructor(url2) {
        super();
        __publicField(this, "_isEnabled", false);
        __publicField(this, "_pendingUpdate", null);
        __publicField(this, "_queue", []);
        __publicField(this, "_state", "opening");
        this._ws = new global.WebSocket(url2);
        this._ws.onopen = () => {
          this._state = "open";
          this.emit("open");
          this._flushQueue();
        };
        this._ws.onerror = (error) => {
          this.emit("connection-error", error);
        };
        this._ws.onclose = (closeEvent) => {
          this._state = "closed";
          this.emit("close", closeEvent);
        };
        this._ws.onmessage = (message) => {
          const data = JSON.parse(String(message.data));
          switch (data.type) {
            case "bundle-registered":
              this.emit("bundle-registered");
              break;
            case "update-start":
              this.emit("update-start", data.body);
              break;
            case "update":
              this.emit("update", data.body);
              break;
            case "update-done":
              this.emit("update-done");
              break;
            case "error":
              this.emit("error", data.body);
              break;
            default:
              this.emit("error", {
                type: "unknown-message",
                message: data
              });
          }
        };
        this.on("update", (update) => {
          if (this._isEnabled) {
            injectUpdate(update);
          } else if (this._pendingUpdate == null) {
            this._pendingUpdate = update;
          } else {
            this._pendingUpdate = mergeUpdates(this._pendingUpdate, update);
          }
        });
      }
      close() {
        this._ws.close();
      }
      send(message) {
        switch (this._state) {
          case "opening":
            this._queue.push(message);
            break;
          case "open":
            this._ws.send(message);
            break;
          case "closed":
            break;
          default:
            throw new Error("[WebSocketHMRClient] Unknown state: " + this._state);
        }
      }
      _flushQueue() {
        this._queue.forEach((message) => this.send(message));
        this._queue.length = 0;
      }
      enable() {
        this._isEnabled = true;
        const update = this._pendingUpdate;
        this._pendingUpdate = null;
        if (update != null) {
          injectUpdate(update);
        }
      }
      disable() {
        this._isEnabled = false;
      }
      isEnabled() {
        return this._isEnabled;
      }
      hasPendingUpdates() {
        return this._pendingUpdate != null;
      }
    };
    function mergeUpdates(base, next) {
      const addedIDs = /* @__PURE__ */ new Set();
      const deletedIDs = /* @__PURE__ */ new Set();
      const moduleMap = /* @__PURE__ */ new Map();
      applyUpdateLocally(base);
      applyUpdateLocally(next);
      function applyUpdateLocally(update) {
        update.deleted.forEach((id2) => {
          if (addedIDs.has(id2)) {
            addedIDs.delete(id2);
          } else {
            deletedIDs.add(id2);
          }
          moduleMap.delete(id2);
        });
        update.added.forEach((item) => {
          const id2 = item.module[0];
          if (deletedIDs.has(id2)) {
            deletedIDs.delete(id2);
          } else {
            addedIDs.add(id2);
          }
          moduleMap.set(id2, item);
        });
        update.modified.forEach((item) => {
          const id2 = item.module[0];
          moduleMap.set(id2, item);
        });
      }
      const result = {
        isInitialUpdate: next.isInitialUpdate,
        revisionId: next.revisionId,
        added: [],
        modified: [],
        deleted: []
      };
      deletedIDs.forEach((id2) => {
        result.deleted.push(id2);
      });
      moduleMap.forEach((item, id2) => {
        if (deletedIDs.has(id2)) {
          return;
        }
        if (addedIDs.has(id2)) {
          result.added.push(item);
        } else {
          result.modified.push(item);
        }
      });
      return result;
    }
    module.exports = HMRClient;
  }
});

// ../../node_modules/@expo/metro/metro-runtime/modules/HMRClient.js
var require_HMRClient2 = __commonJS({
  "../../node_modules/@expo/metro/metro-runtime/modules/HMRClient.js"(exports2, module2) {
    "use strict";
    module2.exports = require_HMRClient();
  }
});

// ../../node_modules/pretty-format/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/pretty-format/node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code2) => `\x1B[${38 + offset};5;${code2}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles2)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles2[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles2[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      styles2.color.ansi256 = wrapAnsi256();
      styles2.color.ansi16m = wrapAnsi16m();
      styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles2, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
          enumerable: false
        }
      });
      return styles2;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// ../../node_modules/pretty-format/build/collections.js
var require_collections = __commonJS({
  "../../node_modules/pretty-format/build/collections.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.printIteratorEntries = printIteratorEntries;
    exports2.printIteratorValues = printIteratorValues;
    exports2.printListItems = printListItems;
    exports2.printObjectProperties = printObjectProperties;
    var getKeysOfEnumerableProperties = (object, compareKeys) => {
      const rawKeys = Object.keys(object);
      const keys = compareKeys !== null ? rawKeys.sort(compareKeys) : rawKeys;
      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object).forEach((symbol) => {
          if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
            keys.push(symbol);
          }
        });
      }
      return keys;
    };
    function printIteratorEntries(iterator, config, indentation, depth, refs, printer, separator = ": ") {
      let result = "";
      let width = 0;
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          result += indentationNext;
          if (width++ === config.maxWidth) {
            result += "\u2026";
            break;
          }
          const name = printer(
            current.value[0],
            config,
            indentationNext,
            depth,
            refs
          );
          const value = printer(
            current.value[1],
            config,
            indentationNext,
            depth,
            refs
          );
          result += name + separator + value;
          current = iterator.next();
          if (!current.done) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
      let result = "";
      let width = 0;
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          result += indentationNext;
          if (width++ === config.maxWidth) {
            result += "\u2026";
            break;
          }
          result += printer(current.value, config, indentationNext, depth, refs);
          current = iterator.next();
          if (!current.done) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printListItems(list, config, indentation, depth, refs, printer) {
      let result = "";
      if (list.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < list.length; i++) {
          result += indentationNext;
          if (i === config.maxWidth) {
            result += "\u2026";
            break;
          }
          if (i in list) {
            result += printer(list[i], config, indentationNext, depth, refs);
          }
          if (i < list.length - 1) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printObjectProperties(val, config, indentation, depth, refs, printer) {
      let result = "";
      const keys = getKeysOfEnumerableProperties(val, config.compareKeys);
      if (keys.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const name = printer(key, config, indentationNext, depth, refs);
          const value = printer(val[key], config, indentationNext, depth, refs);
          result += `${indentationNext + name}: ${value}`;
          if (i < keys.length - 1) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
  }
});

// ../../node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
var require_AsymmetricMatcher = __commonJS({
  "../../node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _collections = require_collections();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var asymmetricMatcher = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621;
    var SPACE = " ";
    var serialize = (val, config, indentation, depth, refs, printer) => {
      const stringedValue = val.toString();
      if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
        if (++depth > config.maxDepth) {
          return `[${stringedValue}]`;
        }
        return `${stringedValue + SPACE}[${(0, _collections.printListItems)(
          val.sample,
          config,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
        if (++depth > config.maxDepth) {
          return `[${stringedValue}]`;
        }
        return `${stringedValue + SPACE}{${(0, _collections.printObjectProperties)(
          val.sample,
          config,
          indentation,
          depth,
          refs,
          printer
        )}}`;
      }
      if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      if (typeof val.toAsymmetricMatcher !== "function") {
        throw new Error(
          `Asymmetric matcher ${val.constructor.name} does not implement toAsymmetricMatcher()`
        );
      }
      return val.toAsymmetricMatcher();
    };
    exports2.serialize = serialize;
    var test = (val) => val && val.$$typeof === asymmetricMatcher;
    exports2.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports2.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/DOMCollection.js
var require_DOMCollection = __commonJS({
  "../../node_modules/pretty-format/build/plugins/DOMCollection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _collections = require_collections();
    var SPACE = " ";
    var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
    var testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    var test = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
    exports2.test = test;
    var isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
    var serialize = (collection, config, indentation, depth, refs, printer) => {
      const name = collection.constructor.name;
      if (++depth > config.maxDepth) {
        return `[${name}]`;
      }
      return (config.min ? "" : name + SPACE) + (OBJECT_NAMES.indexOf(name) !== -1 ? `{${(0, _collections.printObjectProperties)(
        isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}) : {
          ...collection
        },
        config,
        indentation,
        depth,
        refs,
        printer
      )}}` : `[${(0, _collections.printListItems)(
        Array.from(collection),
        config,
        indentation,
        depth,
        refs,
        printer
      )}]`);
    };
    exports2.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports2.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/lib/escapeHTML.js
var require_escapeHTML = __commonJS({
  "../../node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = escapeHTML;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
});

// ../../node_modules/pretty-format/build/plugins/lib/markup.js
var require_markup = __commonJS({
  "../../node_modules/pretty-format/build/plugins/lib/markup.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.printText = exports2.printProps = exports2.printElementAsLeaf = exports2.printElement = exports2.printComment = exports2.printChildren = void 0;
    var _escapeHTML = _interopRequireDefault(require_escapeHTML());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var printProps = (keys, props, config, indentation, depth, refs, printer) => {
      const indentationNext = indentation + config.indent;
      const colors = config.colors;
      return keys.map((key) => {
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);
        if (typeof value !== "string") {
          if (printed.indexOf("\n") !== -1) {
            printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
          }
          printed = `{${printed}}`;
        }
        return `${config.spacingInner + indentation + colors.prop.open + key + colors.prop.close}=${colors.value.open}${printed}${colors.value.close}`;
      }).join("");
    };
    exports2.printProps = printProps;
    var printChildren = (children, config, indentation, depth, refs, printer) => children.map(
      (child) => config.spacingOuter + indentation + (typeof child === "string" ? printText(child, config) : printer(child, config, indentation, depth, refs))
    ).join("");
    exports2.printChildren = printChildren;
    var printText = (text, config) => {
      const contentColor = config.colors.content;
      return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
    };
    exports2.printText = printText;
    var printComment = (comment, config) => {
      const commentColor = config.colors.comment;
      return `${commentColor.open}<!--${(0, _escapeHTML.default)(comment)}-->${commentColor.close}`;
    };
    exports2.printComment = printComment;
    var printElement = (type, printedProps, printedChildren, config, indentation) => {
      const tagColor = config.colors.tag;
      return `${tagColor.open}<${type}${printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open}${printedChildren ? `>${tagColor.close}${printedChildren}${config.spacingOuter}${indentation}${tagColor.open}</${type}` : `${printedProps && !config.min ? "" : " "}/`}>${tagColor.close}`;
    };
    exports2.printElement = printElement;
    var printElementAsLeaf = (type, config) => {
      const tagColor = config.colors.tag;
      return `${tagColor.open}<${type}${tagColor.close} \u2026${tagColor.open} />${tagColor.close}`;
    };
    exports2.printElementAsLeaf = printElementAsLeaf;
  }
});

// ../../node_modules/pretty-format/build/plugins/DOMElement.js
var require_DOMElement = __commonJS({
  "../../node_modules/pretty-format/build/plugins/DOMElement.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _markup = require_markup();
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testHasAttribute = (val) => {
      try {
        return typeof val.hasAttribute === "function" && val.hasAttribute("is");
      } catch {
        return false;
      }
    };
    var testNode = (val) => {
      const constructorName = val.constructor.name;
      const { nodeType, tagName } = val;
      const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
      return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
    };
    var test = (val) => val?.constructor?.name && testNode(val);
    exports2.test = test;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    var serialize = (node, config, indentation, depth, refs, printer) => {
      if (nodeIsText(node)) {
        return (0, _markup.printText)(node.data, config);
      }
      if (nodeIsComment(node)) {
        return (0, _markup.printComment)(node.data, config);
      }
      const type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config.maxDepth) {
        return (0, _markup.printElementAsLeaf)(type, config);
      }
      return (0, _markup.printElement)(
        type,
        (0, _markup.printProps)(
          nodeIsFragment(node) ? [] : Array.from(node.attributes, (attr) => attr.name).sort(),
          nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          Array.prototype.slice.call(node.childNodes || node.children),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        config,
        indentation
      );
    };
    exports2.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports2.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/Immutable.js
var require_Immutable = __commonJS({
  "../../node_modules/pretty-format/build/plugins/Immutable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _collections = require_collections();
    var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
    var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
    var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
    var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
    var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
    var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
    var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
    var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
    var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
    var getImmutableName = (name) => `Immutable.${name}`;
    var printAsLeaf = (name) => `[${name}]`;
    var SPACE = " ";
    var LAZY = "\u2026";
    var printImmutableEntries = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : `${getImmutableName(type) + SPACE}{${(0, _collections.printIteratorEntries)(
      val.entries(),
      config,
      indentation,
      depth,
      refs,
      printer
    )}}`;
    function getRecordEntries(val) {
      let i = 0;
      return {
        next() {
          if (i < val._keys.length) {
            const key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)]
            };
          }
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
    var printImmutableRecord = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName(val._name || "Record");
      return ++depth > config.maxDepth ? printAsLeaf(name) : `${name + SPACE}{${(0, _collections.printIteratorEntries)(
        getRecordEntries(val),
        config,
        indentation,
        depth,
        refs,
        printer
      )}}`;
    };
    var printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName("Seq");
      if (++depth > config.maxDepth) {
        return printAsLeaf(name);
      }
      if (val[IS_KEYED_SENTINEL]) {
        return `${name + SPACE}{${// from Immutable collection of entries or from ECMAScript object
        val._iter || val._object ? (0, _collections.printIteratorEntries)(
          val.entries(),
          config,
          indentation,
          depth,
          refs,
          printer
        ) : LAZY}}`;
      }
      return `${name + SPACE}[${val._iter || // from Immutable collection of values
      val._array || // from ECMAScript array
      val._collection || // from ECMAScript collection in immutable v4
      val._iterable ? (0, _collections.printIteratorValues)(
        val.values(),
        config,
        indentation,
        depth,
        refs,
        printer
      ) : LAZY}]`;
    };
    var printImmutableValues = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : `${getImmutableName(type) + SPACE}[${(0, _collections.printIteratorValues)(
      val.values(),
      config,
      indentation,
      depth,
      refs,
      printer
    )}]`;
    var serialize = (val, config, indentation, depth, refs, printer) => {
      if (val[IS_MAP_SENTINEL]) {
        return printImmutableEntries(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map"
        );
      }
      if (val[IS_LIST_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          "List"
        );
      }
      if (val[IS_SET_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set"
        );
      }
      if (val[IS_STACK_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          "Stack"
        );
      }
      if (val[IS_SEQ_SENTINEL]) {
        return printImmutableSeq(val, config, indentation, depth, refs, printer);
      }
      return printImmutableRecord(val, config, indentation, depth, refs, printer);
    };
    exports2.serialize = serialize;
    var test = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
    exports2.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports2.default = _default;
  }
});

// ../../node_modules/pretty-format/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../node_modules/pretty-format/node_modules/react-is/cjs/react-is.production.min.js"(exports2) {
    "use strict";
    var b = /* @__PURE__ */ Symbol.for("react.element");
    var c = /* @__PURE__ */ Symbol.for("react.portal");
    var d = /* @__PURE__ */ Symbol.for("react.fragment");
    var e = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var f = /* @__PURE__ */ Symbol.for("react.profiler");
    var g = /* @__PURE__ */ Symbol.for("react.provider");
    var h = /* @__PURE__ */ Symbol.for("react.context");
    var k = /* @__PURE__ */ Symbol.for("react.server_context");
    var l = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var m = /* @__PURE__ */ Symbol.for("react.suspense");
    var n = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var p = /* @__PURE__ */ Symbol.for("react.memo");
    var q = /* @__PURE__ */ Symbol.for("react.lazy");
    var t = /* @__PURE__ */ Symbol.for("react.offscreen");
    var u;
    u = /* @__PURE__ */ Symbol.for("react.module.reference");
    function v(a) {
      if ("object" === typeof a && null !== a) {
        var r = a.$$typeof;
        switch (r) {
          case b:
            switch (a = a.type, a) {
              case d:
              case f:
              case e:
              case m:
              case n:
                return a;
              default:
                switch (a = a && a.$$typeof, a) {
                  case k:
                  case h:
                  case l:
                  case q:
                  case p:
                  case g:
                    return a;
                  default:
                    return r;
                }
            }
          case c:
            return r;
        }
      }
    }
    exports2.ContextConsumer = h;
    exports2.ContextProvider = g;
    exports2.Element = b;
    exports2.ForwardRef = l;
    exports2.Fragment = d;
    exports2.Lazy = q;
    exports2.Memo = p;
    exports2.Portal = c;
    exports2.Profiler = f;
    exports2.StrictMode = e;
    exports2.Suspense = m;
    exports2.SuspenseList = n;
    exports2.isAsyncMode = function() {
      return false;
    };
    exports2.isConcurrentMode = function() {
      return false;
    };
    exports2.isContextConsumer = function(a) {
      return v(a) === h;
    };
    exports2.isContextProvider = function(a) {
      return v(a) === g;
    };
    exports2.isElement = function(a) {
      return "object" === typeof a && null !== a && a.$$typeof === b;
    };
    exports2.isForwardRef = function(a) {
      return v(a) === l;
    };
    exports2.isFragment = function(a) {
      return v(a) === d;
    };
    exports2.isLazy = function(a) {
      return v(a) === q;
    };
    exports2.isMemo = function(a) {
      return v(a) === p;
    };
    exports2.isPortal = function(a) {
      return v(a) === c;
    };
    exports2.isProfiler = function(a) {
      return v(a) === f;
    };
    exports2.isStrictMode = function(a) {
      return v(a) === e;
    };
    exports2.isSuspense = function(a) {
      return v(a) === m;
    };
    exports2.isSuspenseList = function(a) {
      return v(a) === n;
    };
    exports2.isValidElementType = function(a) {
      return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? true : false;
    };
    exports2.typeOf = v;
  }
});

// ../../node_modules/pretty-format/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../node_modules/pretty-format/node_modules/react-is/cjs/react-is.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
        var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
        var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = /* @__PURE__ */ Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports2.ContextConsumer = ContextConsumer;
        exports2.ContextProvider = ContextProvider;
        exports2.Element = Element;
        exports2.ForwardRef = ForwardRef;
        exports2.Fragment = Fragment;
        exports2.Lazy = Lazy;
        exports2.Memo = Memo;
        exports2.Portal = Portal;
        exports2.Profiler = Profiler;
        exports2.StrictMode = StrictMode;
        exports2.Suspense = Suspense;
        exports2.SuspenseList = SuspenseList;
        exports2.isAsyncMode = isAsyncMode;
        exports2.isConcurrentMode = isConcurrentMode;
        exports2.isContextConsumer = isContextConsumer;
        exports2.isContextProvider = isContextProvider;
        exports2.isElement = isElement;
        exports2.isForwardRef = isForwardRef;
        exports2.isFragment = isFragment;
        exports2.isLazy = isLazy;
        exports2.isMemo = isMemo;
        exports2.isPortal = isPortal;
        exports2.isProfiler = isProfiler;
        exports2.isStrictMode = isStrictMode;
        exports2.isSuspense = isSuspense;
        exports2.isSuspenseList = isSuspenseList;
        exports2.isValidElementType = isValidElementType;
        exports2.typeOf = typeOf;
      })();
    }
  }
});

// ../../node_modules/pretty-format/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/pretty-format/node_modules/react-is/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_is_production_min();
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// ../../node_modules/pretty-format/build/plugins/ReactElement.js
var require_ReactElement = __commonJS({
  "../../node_modules/pretty-format/build/plugins/ReactElement.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var ReactIs = _interopRequireWildcard(require_react_is());
    var _markup = require_markup();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getChildren = (arg, children = []) => {
      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }
      return children;
    };
    var getType = (element) => {
      const type = element.type;
      if (typeof type === "string") {
        return type;
      }
      if (typeof type === "function") {
        return type.displayName || type.name || "Unknown";
      }
      if (ReactIs.isFragment(element)) {
        return "React.Fragment";
      }
      if (ReactIs.isSuspense(element)) {
        return "React.Suspense";
      }
      if (typeof type === "object" && type !== null) {
        if (ReactIs.isContextProvider(element)) {
          return "Context.Provider";
        }
        if (ReactIs.isContextConsumer(element)) {
          return "Context.Consumer";
        }
        if (ReactIs.isForwardRef(element)) {
          if (type.displayName) {
            return type.displayName;
          }
          const functionName = type.render.displayName || type.render.name || "";
          return functionName !== "" ? `ForwardRef(${functionName})` : "ForwardRef";
        }
        if (ReactIs.isMemo(element)) {
          const functionName = type.displayName || type.type.displayName || type.type.name || "";
          return functionName !== "" ? `Memo(${functionName})` : "Memo";
        }
      }
      return "UNDEFINED";
    };
    var getPropKeys = (element) => {
      const { props } = element;
      return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
    };
    var serialize = (element, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(getType(element), config) : (0, _markup.printElement)(
      getType(element),
      (0, _markup.printProps)(
        getPropKeys(element),
        element.props,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ),
      (0, _markup.printChildren)(
        getChildren(element.props.children),
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ),
      config,
      indentation
    );
    exports2.serialize = serialize;
    var test = (val) => val != null && ReactIs.isElement(val);
    exports2.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports2.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/ReactTestComponent.js
var require_ReactTestComponent = __commonJS({
  "../../node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _markup = require_markup();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var testSymbol = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487;
    var getPropKeys = (object) => {
      const { props } = object;
      return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
    };
    var serialize = (object, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config) : (0, _markup.printElement)(
      object.type,
      object.props ? (0, _markup.printProps)(
        getPropKeys(object),
        object.props,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ) : "",
      object.children ? (0, _markup.printChildren)(
        object.children,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ) : "",
      config,
      indentation
    );
    exports2.serialize = serialize;
    var test = (val) => val && val.$$typeof === testSymbol;
    exports2.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports2.default = _default;
  }
});

// ../../node_modules/pretty-format/build/index.js
var require_build = __commonJS({
  "../../node_modules/pretty-format/build/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = exports2.DEFAULT_OPTIONS = void 0;
    exports2.format = format;
    exports2.plugins = void 0;
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    var _collections = require_collections();
    var _AsymmetricMatcher = _interopRequireDefault(
      require_AsymmetricMatcher()
    );
    var _DOMCollection = _interopRequireDefault(require_DOMCollection());
    var _DOMElement = _interopRequireDefault(require_DOMElement());
    var _Immutable = _interopRequireDefault(require_Immutable());
    var _ReactElement = _interopRequireDefault(require_ReactElement());
    var _ReactTestComponent = _interopRequireDefault(
      require_ReactTestComponent()
    );
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toString = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
    var isWindow = (val) => typeof window !== "undefined" && val === window;
    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;
    var PrettyFormatPluginError = class extends Error {
      constructor(message, stack) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
      }
    };
    function isToStringedArrayType(toStringed) {
      return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
    }
    function printNumber(val) {
      return Object.is(val, -0) ? "-0" : String(val);
    }
    function printBigInt(val) {
      return String(`${val}n`);
    }
    function printFunction(val, printFunctionName) {
      if (!printFunctionName) {
        return "[Function]";
      }
      return `[Function ${val.name || "anonymous"}]`;
    }
    function printSymbol(val) {
      return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
    }
    function printError(val) {
      return `[${errorToString.call(val)}]`;
    }
    function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
      if (val === true || val === false) {
        return `${val}`;
      }
      if (val === void 0) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      const typeOf = typeof val;
      if (typeOf === "number") {
        return printNumber(val);
      }
      if (typeOf === "bigint") {
        return printBigInt(val);
      }
      if (typeOf === "string") {
        if (escapeString) {
          return `"${val.replace(/"|\\/g, "\\$&")}"`;
        }
        return `"${val}"`;
      }
      if (typeOf === "function") {
        return printFunction(val, printFunctionName);
      }
      if (typeOf === "symbol") {
        return printSymbol(val);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object WeakMap]") {
        return "WeakMap {}";
      }
      if (toStringed === "[object WeakSet]") {
        return "WeakSet {}";
      }
      if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
        return printFunction(val, printFunctionName);
      }
      if (toStringed === "[object Symbol]") {
        return printSymbol(val);
      }
      if (toStringed === "[object Date]") {
        return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
      }
      if (toStringed === "[object Error]") {
        return printError(val);
      }
      if (toStringed === "[object RegExp]") {
        if (escapeRegex) {
          return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        return regExpToString.call(val);
      }
      if (val instanceof Error) {
        return printError(val);
      }
      return null;
    }
    function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
      if (refs.indexOf(val) !== -1) {
        return "[Circular]";
      }
      refs = refs.slice();
      refs.push(val);
      const hitMaxDepth = ++depth > config.maxDepth;
      const min = config.min;
      if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
        return printer(val.toJSON(), config, indentation, depth, refs, true);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object Arguments]") {
        return hitMaxDepth ? "[Arguments]" : `${min ? "" : "Arguments "}[${(0, _collections.printListItems)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth ? `[${val.constructor.name}]` : `${min ? "" : !config.printBasicPrototype && val.constructor.name === "Array" ? "" : `${val.constructor.name} `}[${(0, _collections.printListItems)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (toStringed === "[object Map]") {
        return hitMaxDepth ? "[Map]" : `Map {${(0, _collections.printIteratorEntries)(
          val.entries(),
          config,
          indentation,
          depth,
          refs,
          printer,
          " => "
        )}}`;
      }
      if (toStringed === "[object Set]") {
        return hitMaxDepth ? "[Set]" : `Set {${(0, _collections.printIteratorValues)(
          val.values(),
          config,
          indentation,
          depth,
          refs,
          printer
        )}}`;
      }
      return hitMaxDepth || isWindow(val) ? `[${getConstructorName(val)}]` : `${min ? "" : !config.printBasicPrototype && getConstructorName(val) === "Object" ? "" : `${getConstructorName(val)} `}{${(0, _collections.printObjectProperties)(
        val,
        config,
        indentation,
        depth,
        refs,
        printer
      )}}`;
    }
    function isNewPlugin(plugin) {
      return plugin.serialize != null;
    }
    function printPlugin(plugin, val, config, indentation, depth, refs) {
      let printed;
      try {
        printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(
          val,
          (valChild) => printer(valChild, config, indentation, depth, refs),
          (str) => {
            const indentationNext = indentation + config.indent;
            return indentationNext + str.replace(NEWLINE_REGEXP, `
${indentationNext}`);
          },
          {
            edgeSpacing: config.spacingOuter,
            min: config.min,
            spacing: config.spacingInner
          },
          config.colors
        );
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
      if (typeof printed !== "string") {
        throw new Error(
          `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
        );
      }
      return printed;
    }
    function findPlugin(plugins3, val) {
      for (let p = 0; p < plugins3.length; p++) {
        try {
          if (plugins3[p].test(val)) {
            return plugins3[p];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }
      return null;
    }
    function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
      const plugin = findPlugin(config.plugins, val);
      if (plugin !== null) {
        return printPlugin(plugin, val, config, indentation, depth, refs);
      }
      const basicResult = printBasicValue(
        val,
        config.printFunctionName,
        config.escapeRegex,
        config.escapeString
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(
        val,
        config,
        indentation,
        depth,
        refs,
        hasCalledToJSON
      );
    }
    var DEFAULT_THEME = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green"
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var toOptionsSubtype = (options) => options;
    var DEFAULT_OPTIONS = toOptionsSubtype({
      callToJSON: true,
      compareKeys: void 0,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      maxWidth: Infinity,
      min: false,
      plugins: [],
      printBasicPrototype: true,
      printFunctionName: true,
      theme: DEFAULT_THEME
    });
    exports2.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    function validateOptions(options) {
      Object.keys(options).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(DEFAULT_OPTIONS, key)) {
          throw new Error(`pretty-format: Unknown option "${key}".`);
        }
      });
      if (options.min && options.indent !== void 0 && options.indent !== 0) {
        throw new Error(
          'pretty-format: Options "min" and "indent" cannot be used together.'
        );
      }
      if (options.theme !== void 0) {
        if (options.theme === null) {
          throw new Error('pretty-format: Option "theme" must not be null.');
        }
        if (typeof options.theme !== "object") {
          throw new Error(
            `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
          );
        }
      }
    }
    var getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
      const color = value && _ansiStyles.default[value];
      if (color && typeof color.close === "string" && typeof color.open === "string") {
        colors[key] = color;
      } else {
        throw new Error(
          `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
        );
      }
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      colors[key] = {
        close: "",
        open: ""
      };
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getPrintFunctionName = (options) => options?.printFunctionName ?? DEFAULT_OPTIONS.printFunctionName;
    var getEscapeRegex = (options) => options?.escapeRegex ?? DEFAULT_OPTIONS.escapeRegex;
    var getEscapeString = (options) => options?.escapeString ?? DEFAULT_OPTIONS.escapeString;
    var getConfig = (options) => ({
      callToJSON: options?.callToJSON ?? DEFAULT_OPTIONS.callToJSON,
      colors: options?.highlight ? getColorsHighlight(options) : getColorsEmpty(),
      compareKeys: typeof options?.compareKeys === "function" || options?.compareKeys === null ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
      escapeRegex: getEscapeRegex(options),
      escapeString: getEscapeString(options),
      indent: options?.min ? "" : createIndent(options?.indent ?? DEFAULT_OPTIONS.indent),
      maxDepth: options?.maxDepth ?? DEFAULT_OPTIONS.maxDepth,
      maxWidth: options?.maxWidth ?? DEFAULT_OPTIONS.maxWidth,
      min: options?.min ?? DEFAULT_OPTIONS.min,
      plugins: options?.plugins ?? DEFAULT_OPTIONS.plugins,
      printBasicPrototype: options?.printBasicPrototype ?? true,
      printFunctionName: getPrintFunctionName(options),
      spacingInner: options?.min ? " " : "\n",
      spacingOuter: options?.min ? "" : "\n"
    });
    function createIndent(indent) {
      return new Array(indent + 1).join(" ");
    }
    function format(val, options) {
      if (options) {
        validateOptions(options);
        if (options.plugins) {
          const plugin = findPlugin(options.plugins, val);
          if (plugin !== null) {
            return printPlugin(plugin, val, getConfig(options), "", 0, []);
          }
        }
      }
      const basicResult = printBasicValue(
        val,
        getPrintFunctionName(options),
        getEscapeRegex(options),
        getEscapeString(options)
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, getConfig(options), "", 0, []);
    }
    var plugins2 = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default
    };
    exports2.plugins = plugins2;
    var _default = format;
    exports2.default = _default;
  }
});

// ../../node_modules/@expo/log-box/build/utils/metroBuildErrorsFormat.js
var require_metroBuildErrorsFormat = __commonJS({
  "../../node_modules/@expo/log-box/build/utils/metroBuildErrorsFormat.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseMetroError = parseMetroError;
    exports2.parseBabelTransformError = parseBabelTransformError;
    exports2.parseBabelCodeFrameError = parseBabelCodeFrameError;
    var BABEL_TRANSFORM_ERROR_FORMAT = /^(?:TransformError )?(?:SyntaxError: |ReferenceError: )(.*): (.*) \((\d+):(\d+)\)\n\n([\s\S]+)/;
    var BABEL_CODE_FRAME_ERROR_FORMAT = (
      // Adjusted from original to not capture import stack a part of the code frame
      /^(?:TransformError )?(?:.*):? (?:.*?)([/|\\].*): ([\s\S]+?)\n((?:[ >]*\d+[\s|]+[^\n]*\n?)+|\u{001b}\[[0-9;]*m(?:.*\n?)+?(?=\n\n|\n[^\u{001b}\s]|$))/mu
    );
    var METRO_ERROR_FORMAT = /^(?:(?:InternalError )?Metro has encountered an error:) (.*): (.*) \((\d+):(\d+)\)\n\n([\s\S]+)/u;
    var UNABLE_TO_RESOLVE_MODULE_ERROR_FORMAT = /(?:\w )?Unable to resolve module (.*) from/;
    function parseMetroError(message) {
      const e = message.match(METRO_ERROR_FORMAT);
      if (!e) {
        return null;
      }
      const [, content, fileName, row, column, codeFrame] = e;
      return {
        content,
        fileName,
        row: parseInt(row, 10),
        column: parseInt(column, 10),
        codeFrame
      };
    }
    function parseBabelTransformError(message) {
      const e = message.match(BABEL_TRANSFORM_ERROR_FORMAT);
      if (!e) {
        return null;
      }
      const [, fileName, content, row, column, codeFrame] = e;
      return {
        content,
        fileName,
        row: parseInt(row, 10),
        column: parseInt(column, 10),
        codeFrame
      };
    }
    function parseBabelCodeFrameError(message) {
      const e = message.match(BABEL_CODE_FRAME_ERROR_FORMAT);
      if (!e) {
        return null;
      }
      const [, fileName, content, codeFrame] = e;
      const [, missingModule] = message.match(UNABLE_TO_RESOLVE_MODULE_ERROR_FORMAT) || [];
      const messageContent = missingModule ? `Unable to resolve module ${missingModule}` : content;
      return {
        content: messageContent,
        fileName,
        row: -1,
        column: -1,
        codeFrame,
        missingModule
      };
    }
  }
});

// ../../node_modules/@expo/log-box/build/utils/parseWebBuildErrors.js
var require_parseWebBuildErrors = __commonJS({
  "../../node_modules/@expo/log-box/build/utils/parseWebBuildErrors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseWebBuildErrors = parseWebBuildErrors;
    var metroBuildErrorsFormat_1 = require_metroBuildErrorsFormat();
    function parseWebBuildErrors({ error, projectRoot, parseErrorStack }) {
      let stack;
      if (isTransformError(error) && error.filename) {
        stack = [
          {
            // Avoid using node:path to be compatible with web and RN runtime.
            file: `${projectRoot}/${error.filename}`,
            methodName: "<unknown>",
            // TODO: Import stack
            lineNumber: error.lineNumber,
            column: error.column
          }
        ];
      } else if ("originModulePath" in error && typeof error.originModulePath === "string" && "targetModuleName" in error && typeof error.targetModuleName === "string" && "cause" in error) {
        const { codeFrame } = (0, metroBuildErrorsFormat_1.parseBabelCodeFrameError)(error.message) || {};
        const content = `Unable to resolve module ${error.targetModuleName}`;
        return {
          level: "resolution",
          // TODO: Add import stacks
          stack: [],
          isComponentError: false,
          componentStack: [],
          codeFrame: codeFrame ? {
            fileName: error.originModulePath,
            location: null,
            // We are not given the location.
            content: codeFrame
          } : void 0,
          message: {
            content,
            substitutions: []
          },
          category: `${error.originModulePath}-${1}-${1}`
        };
      } else {
        stack = parseErrorStack(projectRoot, error.stack);
      }
      return {
        level: "static",
        message: {
          content: error.message,
          substitutions: []
        },
        isComponentError: false,
        stack,
        category: "static",
        componentStack: []
      };
    }
    function isTransformError(error) {
      return error.type === "TransformError";
    }
  }
});

// ../../node_modules/@expo/log-box/build/utils/withoutANSIStyles.js
var require_withoutANSIStyles = __commonJS({
  "../../node_modules/@expo/log-box/build/utils/withoutANSIStyles.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.withoutANSIColorStyles = withoutANSIColorStyles2;
    function withoutANSIColorStyles2(message) {
      if (typeof message !== "string") {
        return message;
      }
      return message.replace(
        // eslint-disable-next-line no-control-regex
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
      );
    }
  }
});

// ../../node_modules/@expo/log-box/build/utils.js
var require_utils = __commonJS({
  "../../node_modules/@expo/log-box/build/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.withoutANSIColorStyles = exports2.parseWebBuildErrors = void 0;
    var parseWebBuildErrors_1 = require_parseWebBuildErrors();
    Object.defineProperty(exports2, "parseWebBuildErrors", { enumerable: true, get: function() {
      return parseWebBuildErrors_1.parseWebBuildErrors;
    } });
    var withoutANSIStyles_1 = require_withoutANSIStyles();
    Object.defineProperty(exports2, "withoutANSIColorStyles", { enumerable: true, get: function() {
      return withoutANSIStyles_1.withoutANSIColorStyles;
    } });
  }
});

// ../../node_modules/@expo/log-box/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/@expo/log-box/utils.js"(exports2, module2) {
    "use strict";
    module2.exports = require_utils();
  }
});

// ../../node_modules/expo/src/async-require/buildErrors.ts
var import_utils, HMRMetroBuildError;
var init_buildErrors = __esm({
  "../../node_modules/expo/src/async-require/buildErrors.ts"() {
    "use strict";
    import_utils = __toESM(require_utils2());
    HMRMetroBuildError = class extends Error {
      constructor(message = "Unknown Metro Error", type, cause) {
        super(message);
        this.name = type || "BuildError";
        this.cause = cause;
        this.originalMessage = [type, message].filter(Boolean).join(": ");
        this.message = (0, import_utils.withoutANSIColorStyles)(message);
        this.stack = "";
      }
    };
  }
});

// ../../node_modules/expo/src/async-require/getFullBundlerUrl.ts
function getFullBundlerUrl() {
  const currentScript = document?.currentScript;
  const bundleUrl = new URL(
    currentScript && "src" in currentScript ? currentScript.src : location.href,
    location.href
  );
  if (!bundleUrl.searchParams.has("platform")) {
    bundleUrl.searchParams.set("platform", process.env.EXPO_OS ?? "web");
  }
  return bundleUrl.toString();
}
var init_getFullBundlerUrl = __esm({
  "../../node_modules/expo/src/async-require/getFullBundlerUrl.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo/src/async-require/hmrUtils.ts
function getFullBundlerUrl2(_) {
  return getFullBundlerUrl();
}
function showLoading(message, _type) {
  import_react_native4.DeviceEventEmitter.emit("devLoadingView:showMessage", {
    message
  });
}
function hideLoading() {
  import_react_native4.DeviceEventEmitter.emit("devLoadingView:hide", {});
}
function resetErrorOverlay() {
  globalThis.__expo_dev_resetErrors?.();
}
function getConnectionError(serverHost, e) {
  return `
Cannot connect to Expo CLI.

Try the following to fix the issue:
- Ensure the Expo dev server is running and available on the same network as this device

URL: ${serverHost}

Error: ${e.message}
  `.trim();
}
function handleCompileError(cause) {
  if (!cause) {
    return;
  }
  throw new HMRMetroBuildError(cause.message, cause.type, cause.cause);
}
var import_react_native4;
var init_hmrUtils = __esm({
  "../../node_modules/expo/src/async-require/hmrUtils.ts"() {
    "use strict";
    import_react_native4 = require("react-native");
    init_buildErrors();
    init_getFullBundlerUrl();
  }
});

// ../../node_modules/expo/src/async-require/hmr.ts
var hmr_exports = {};
__export(hmr_exports, {
  default: () => hmr_default
});
function assert(foo, msg) {
  if (!foo) throw new Error(msg);
}
function setHMRUnavailableReason(reason) {
  assert(hmrClient, "Expected HMRClient.setup() call at startup.");
  if (hmrUnavailableReason !== null) {
    return;
  }
  hmrUnavailableReason = reason;
  if (hmrClient.isEnabled() && didConnect) {
    setTimeout(() => {
      console.warn(reason);
    }, 500);
  }
}
function registerBundleEntryPoints(client) {
  if (hmrUnavailableReason != null) {
    window.location.reload();
    return;
  }
  if (pendingEntryPoints.length > 0) {
    client?.send(
      JSON.stringify({
        type: "register-entrypoints",
        entryPoints: pendingEntryPoints
      })
    );
    pendingEntryPoints.length = 0;
  }
}
function flushEarlyLogs() {
  try {
    pendingLogs.forEach(([level, data]) => {
      HMRClient2.log(level, data);
    });
  } finally {
    pendingLogs.length = 0;
  }
}
function showCompileError() {
  if (buildErrorQueue.size === 0) {
    return;
  }
  const cause = buildErrorQueue.values().next().value;
  buildErrorQueue.clear();
  handleCompileError(cause);
}
var import_HMRClient, import_pretty_format, pendingEntryPoints, prettyFormatFunc, hmrClient, hmrUnavailableReason, buildErrorQueue, didConnect, pendingLogs, HMRClient2, hmr_default;
var init_hmr = __esm({
  "../../node_modules/expo/src/async-require/hmr.ts"() {
    "use strict";
    import_HMRClient = __toESM(require_HMRClient2());
    import_pretty_format = __toESM(require_build());
    init_hmrUtils();
    pendingEntryPoints = [];
    prettyFormatFunc = typeof import_pretty_format.default === "function" ? import_pretty_format.default : import_pretty_format.default.default;
    hmrClient = null;
    hmrUnavailableReason = null;
    buildErrorQueue = /* @__PURE__ */ new Set();
    didConnect = false;
    pendingLogs = [];
    HMRClient2 = {
      enable() {
        if (hmrUnavailableReason !== null) {
          throw new Error(hmrUnavailableReason);
        }
        assert(hmrClient, "Expected HMRClient.setup() call at startup.");
        hmrClient.send(JSON.stringify({ type: "log-opt-in" }));
        const hasUpdates = hmrClient.hasPendingUpdates();
        if (hasUpdates) {
          showLoading("Refreshing...", "refresh");
        }
        try {
          hmrClient.enable();
        } finally {
          if (hasUpdates) {
            hideLoading();
          }
        }
        showCompileError();
      },
      disable() {
        assert(hmrClient, "Expected HMRClient.setup() call at startup.");
        hmrClient.disable();
      },
      registerBundle(requestUrl) {
        assert(hmrClient, "Expected HMRClient.setup() call at startup.");
        pendingEntryPoints.push(requestUrl);
        registerBundleEntryPoints(hmrClient);
      },
      log(level, data) {
        if (!hmrClient) {
          pendingLogs.push([level, data]);
          if (pendingLogs.length > 100) {
            pendingLogs.shift();
          }
          return;
        }
        try {
          const webMetadata = process.env.EXPO_OS === "web" ? {
            platform: "web",
            mode: "BRIDGE"
          } : void 0;
          hmrClient.send(
            JSON.stringify({
              // TODO: Type this properly.
              ...webMetadata,
              type: "log",
              level,
              data: data.map(
                (item) => typeof item === "string" ? item : prettyFormatFunc(item, {
                  escapeString: true,
                  highlight: true,
                  maxDepth: 3,
                  min: true,
                  plugins: [import_pretty_format.plugins.ReactElement]
                })
              )
            })
          );
        } catch {
        }
      },
      // Called once by the bridge on startup, even if Fast Refresh is off.
      // It creates the HMR client but doesn't actually set up the socket yet.
      setup(platformOrOptions, bundleEntry, host, port, isEnabledOrUndefined, scheme = "http") {
        let isEnabled = !!isEnabledOrUndefined;
        let serverScheme;
        let serverHost;
        if (process.env.EXPO_OS === "web") {
          assert(
            platformOrOptions && typeof platformOrOptions === "object",
            "Expected platformOrOptions to be an options object on web."
          );
          assert(!hmrClient, "Cannot initialize hmrClient twice");
          isEnabled = platformOrOptions.isEnabled;
          serverScheme = window.location.protocol === "https:" ? "wss" : "ws";
          serverHost = window.location.host;
        } else {
          assert(
            platformOrOptions && typeof platformOrOptions === "string",
            "Missing required parameter `platform`"
          );
          assert(bundleEntry, "Missing required parameter `bundleEntry`");
          assert(host, "Missing required parameter `host`");
          assert(!hmrClient, "Cannot initialize hmrClient twice");
          serverHost = port !== null && port !== "" ? `${host}:${port}` : host;
          serverScheme = scheme;
        }
        const origin = `${serverScheme}://${serverHost}`;
        const client = new import_HMRClient.default(`${origin}/hot`);
        hmrClient = client;
        pendingEntryPoints.push(
          // HMRServer understands regular bundle URLs, so prefer that in case
          // there are any important URL parameters we can't reconstruct from
          // `setup()`'s arguments.
          getFullBundlerUrl2({
            serverScheme,
            serverHost,
            bundleEntry,
            platform: typeof platformOrOptions === "string" ? platformOrOptions : void 0
          })
        );
        client.on("connection-error", (e) => {
          setHMRUnavailableReason(getConnectionError(serverHost, e));
        });
        client.on("update-start", ({ isInitialUpdate }) => {
          buildErrorQueue.clear();
          didConnect = true;
          if (client.isEnabled() && !isInitialUpdate) {
            showLoading("Refreshing...", "refresh");
          }
        });
        client.on(
          "update",
          ({
            isInitialUpdate,
            added,
            modified,
            deleted
          }) => {
            const isEmpty = added.length === 0 && modified.length === 0 && deleted.length === 0;
            if (client.isEnabled() && !isInitialUpdate && !isEmpty) {
              resetErrorOverlay();
            }
          }
        );
        client.on("update-done", () => {
          hideLoading();
        });
        client.on("error", (data) => this._onMetroError(data));
        client.on("close", (closeEvent) => {
          hideLoading();
          const reason = closeEvent?.reason;
          const code2 = closeEvent?.code || 1e3;
          const title = reason && code2 !== 1e3 && code2 !== 1001 && code2 !== 1005 ? `Disconnected from Metro (${code2}: "${reason}")` : `Disconnected from Metro (${code2})`;
          const message = title + "\nTo reconnect:\n- Ensure that Metro is running and available on the same network\n- Reload this app (will trigger further help if Metro cannot be connected to)";
          setHMRUnavailableReason(message);
        });
        if (isEnabled) {
          HMRClient2.enable();
        } else {
          HMRClient2.disable();
        }
        registerBundleEntryPoints(hmrClient);
        flushEarlyLogs();
      },
      // Related Metro error's formatting
      // https://github.com/facebook/metro/blob/34bb8913ec4b5b02690b39d2246599faf094f721/packages/metro/src/lib/formatBundlingError.js#L36
      _onMetroError(error) {
        if (!hmrClient) {
          return;
        }
        assert(typeof error === "object" && error != null, "Expected data to be an object");
        hideLoading();
        if ("type" in error) {
          if (error.type === "GraphNotFoundError") {
            hmrClient.close();
            setHMRUnavailableReason("Expo CLI has restarted since the last edit. Reload to reconnect.");
            return;
          } else if (error.type === "RevisionNotFoundError") {
            hmrClient.close();
            setHMRUnavailableReason(
              `Expo CLI and the ${process.env.EXPO_OS} client are out of sync. Reload to reconnect.`
            );
            return;
          }
        }
        buildErrorQueue.add(error);
        if (hmrClient.isEnabled()) {
          showCompileError();
        }
      }
    };
    hmr_default = HMRClient2;
  }
});

// ../../node_modules/expo/src/async-require/setupHMR.ts
var setupHMR_exports = {};
var init_setupHMR = __esm({
  "../../node_modules/expo/src/async-require/setupHMR.ts"() {
    "use strict";
    init_hmr();
    if (typeof window !== "undefined" && // @ts-expect-error: Added via react-native-webview
    typeof window.$$EXPO_INITIAL_PROPS !== "undefined") {
      const LEVELS = [
        "trace",
        "info",
        "warn",
        "error",
        "log",
        "group",
        "groupCollapsed",
        "groupEnd",
        "debug"
      ];
      LEVELS.forEach((level) => {
        const originalFunction = console[level];
        console[level] = function(...args) {
          hmr_default.log(level, args);
          originalFunction.apply(console, args);
        };
      });
      hmr_default.log("log", [`[webview] Logs will also appear in the Safari/Chrome debug console`]);
    } else {
      hmr_default.log("log", [`[web] Logs will appear in the browser console`]);
    }
    hmr_default.setup({ isEnabled: true });
  }
});

// ../../node_modules/expo/src/async-require/messageSocket.ts
var require_messageSocket = __commonJS({
  "../../node_modules/expo/src/async-require/messageSocket.ts"() {
    "use strict";
    if (__DEV__) {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const messageSocket = new WebSocket(`${protocol}://${window.location.host}/message`);
      messageSocket.onmessage = (message) => {
        const data = JSON.parse(String(message.data));
        switch (data.method) {
          case "sendDevCommand":
            switch (data.params.name) {
              case "reload":
                window.location.reload();
                break;
              case "rsc-reload":
                if (data.params.platform && data.params.platform !== process.env.EXPO_OS) {
                  return;
                }
                globalThis.__EXPO_RSC_RELOAD_LISTENERS__?.forEach((l) => l());
                break;
              // Inject CSS modules from server components into the root client bundle in development.
              case "module-import":
                {
                  const { data: moduleData } = data.params;
                  const id2 = `expo-module-id="${moduleData.id}"`;
                  const style = document.querySelector(`style[${id2}]`);
                  document.querySelector(`script[${id2}]`)?.remove();
                  const code2 = moduleData.code;
                  const script = document.createElement("script");
                  script.type = "module";
                  script.text = code2;
                  script.setAttribute("expo-module-id", moduleData.id);
                  document.head.appendChild(script);
                  if (style) {
                    queueMicrotask(() => style.parentElement?.removeChild(style));
                  }
                }
                break;
            }
            break;
          case "reload":
            window.location.reload();
            break;
          case "devMenu":
            break;
        }
      };
    }
  }
});

// ../../node_modules/expo/src/async-require/setup.ts
var init_setup = __esm({
  "../../node_modules/expo/src/async-require/setup.ts"() {
    "use strict";
    if (__DEV__ && // Disable for SSR
    typeof window !== "undefined") {
      require_setupFastRefresh();
      init_setupHMR();
      require_messageSocket();
    }
  }
});

// ../../node_modules/expo/src/utils/getBundleUrl.ts
function getBundleUrl() {
  return null;
}
var init_getBundleUrl = __esm({
  "../../node_modules/expo/src/utils/getBundleUrl.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo/src/winter/ImportMetaRegistry.ts
var ImportMetaRegistry_exports = {};
__export(ImportMetaRegistry_exports, {
  ImportMetaRegistry: () => ImportMetaRegistry
});
var ImportMetaRegistry;
var init_ImportMetaRegistry = __esm({
  "../../node_modules/expo/src/winter/ImportMetaRegistry.ts"() {
    "use strict";
    init_getBundleUrl();
    ImportMetaRegistry = {
      get url() {
        return getBundleUrl();
      }
    };
  }
});

// ../../node_modules/expo/src/winter/runtime.ts
var init_runtime = __esm({
  "../../node_modules/expo/src/winter/runtime.ts"() {
    "use strict";
    init_setup();
    Object.defineProperty(globalThis, "__ExpoImportMetaRegistry", {
      value: (init_ImportMetaRegistry(), __toCommonJS(ImportMetaRegistry_exports)).ImportMetaRegistry,
      enumerable: false,
      writable: true
    });
  }
});

// ../../node_modules/expo/src/winter/index.ts
var init_winter = __esm({
  "../../node_modules/expo/src/winter/index.ts"() {
    "use strict";
    init_runtime();
  }
});

// ../../node_modules/expo/src/async-require/getDevServer.ts
var getDevServer, getDevServer_default;
var init_getDevServer = __esm({
  "../../node_modules/expo/src/async-require/getDevServer.ts"() {
    "use strict";
    init_getFullBundlerUrl();
    getDevServer = () => {
      if (typeof window === "undefined") {
        return {
          bundleLoadedFromServer: true,
          fullBundleUrl: "",
          url: ""
        };
      }
      return {
        // The bundle is always loaded from a server in the browser.
        bundleLoadedFromServer: true,
        /** URL but ensures that platform query param is added. */
        get fullBundleUrl() {
          return getFullBundlerUrl();
        },
        url: location.origin + location.pathname
      };
    };
    getDevServer_default = getDevServer;
  }
});

// ../../node_modules/expo/src/async-require/buildUrlForBundle.ts
function buildUrlForBundle(bundlePath) {
  if (/^https?:\/\//.test(bundlePath)) {
    return bundlePath;
  }
  const { url: baseURL } = getDevServer_default();
  return baseURL ? new URL(bundlePath, baseURL).toString() : `//${bundlePath.replace(/^\/+/, "")}`;
}
var init_buildUrlForBundle = __esm({
  "../../node_modules/expo/src/async-require/buildUrlForBundle.ts"() {
    "use strict";
    init_getDevServer();
  }
});

// ../../node_modules/expo/src/async-require/errors.ts
var MetroServerError;
var init_errors = __esm({
  "../../node_modules/expo/src/async-require/errors.ts"() {
    "use strict";
    MetroServerError = class extends Error {
      constructor(errorObject, url2) {
        super(errorObject.message);
        this.code = "METRO_SERVER_ERROR";
        this.name = "MetroServerError";
        this.url = url2;
        for (const key in errorObject) {
          this[key] = errorObject[key];
        }
      }
    };
  }
});

// ../../node_modules/expo/src/async-require/fetchAsync.ts
async function fetchAsync(url2) {
  const response = await fetch(url2, {
    method: "GET",
    headers: {
      // No real reason for this but we try to use this format for everything.
      "expo-platform": "web"
    }
  });
  return {
    body: await response.text(),
    status: response.status,
    headers: response.headers
  };
}
var init_fetchAsync = __esm({
  "../../node_modules/expo/src/async-require/fetchAsync.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo/src/async-require/fetchThenEvalJs.ts
function fetchThenEvalAsync(url) {
  return fetchAsync(url).then(({ body, status, headers }) => {
    if (headers?.has?.("Content-Type") != null && headers.get("Content-Type").includes("application/json")) {
      throw new Error(JSON.parse(body).message || `Unknown error fetching '${url}'`);
    }
    if (status === 200) {
      return eval(body);
    } else {
      if (process.env.NODE_ENV === "development") {
        const error = jsonParseOptional(body);
        if (error) {
          throw new MetroServerError(error, url);
        }
      }
      throw new Error(`Failed to load split bundle from URL: ${url}
${body}`);
    }
  });
}
function jsonParseOptional(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}
var init_fetchThenEvalJs = __esm({
  "../../node_modules/expo/src/async-require/fetchThenEvalJs.ts"() {
    "use strict";
    init_errors();
    init_fetchAsync();
  }
});

// ../../node_modules/expo/src/async-require/fetchThenEval.ts
var init_fetchThenEval = __esm({
  "../../node_modules/expo/src/async-require/fetchThenEval.ts"() {
    "use strict";
    init_fetchThenEvalJs();
  }
});

// ../../node_modules/expo/src/async-require/loadBundle.ts
async function loadBundleAsync(bundlePath) {
  const requestUrl = buildUrlForBundle(bundlePath);
  if (process.env.NODE_ENV === "production") {
    return fetchThenEvalAsync(requestUrl);
  } else {
    return fetchThenEvalAsync(requestUrl).then(() => {
      const HMRClient3 = (init_hmr(), __toCommonJS(hmr_exports)).default;
      HMRClient3.registerBundle(requestUrl);
    });
  }
}
var init_loadBundle = __esm({
  "../../node_modules/expo/src/async-require/loadBundle.ts"() {
    "use strict";
    init_buildUrlForBundle();
    init_fetchThenEval();
  }
});

// ../../node_modules/expo/src/async-require/buildAsyncRequire.ts
function buildAsyncRequire() {
  const cache = /* @__PURE__ */ new Map();
  return async function universal_loadBundleAsync(path) {
    if (cache.has(path)) {
      return cache.get(path);
    }
    const promise = loadBundleAsync(path).catch((error) => {
      cache.delete(path);
      throw error;
    });
    cache.set(path, promise);
    return promise;
  };
}
var init_buildAsyncRequire = __esm({
  "../../node_modules/expo/src/async-require/buildAsyncRequire.ts"() {
    "use strict";
    init_loadBundle();
  }
});

// ../../node_modules/expo/src/async-require/index.ts
var init_async_require = __esm({
  "../../node_modules/expo/src/async-require/index.ts"() {
    "use strict";
    init_buildAsyncRequire();
    globalThis[`${globalThis.__METRO_GLOBAL_PREFIX__ ?? ""}__loadBundleAsync`] = buildAsyncRequire();
  }
});

// ../../node_modules/expo/src/environment/ExpoGo.ts
function isRunningInExpoGo() {
  return NativeExpoGoModule != null;
}
var NativeExpoGoModule;
var init_ExpoGo = __esm({
  "../../node_modules/expo/src/environment/ExpoGo.ts"() {
    "use strict";
    init_src();
    NativeExpoGoModule = (() => {
      try {
        return requireNativeModule("ExpoGo");
      } catch {
        return null;
      }
    })();
  }
});

// ../../node_modules/expo/src/errors/AppEntryNotFound.tsx
function AppEntryNotFound() {
  return /* @__PURE__ */ React.createElement(import_react_native5.View, { style: styles.container }, /* @__PURE__ */ React.createElement(import_react_native5.Text, { style: styles.errorTitle }, "App entry not found"), /* @__PURE__ */ React.createElement(import_react_native5.Text, { style: styles.errorDescription }, `The app entry point named "main" was not registered. This may be due to an uncaught error thrown from a module's top-level code. Refer to the CLI logs and the native device logs for more detail.`));
}
var import_react_native5, styles;
var init_AppEntryNotFound = __esm({
  "../../node_modules/expo/src/errors/AppEntryNotFound.tsx"() {
    "use strict";
    import_react_native5 = require("react-native");
    styles = import_react_native5.StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f2f2f2"
      },
      errorTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#d32f2f",
        textAlign: "center",
        marginBottom: 24
      },
      errorDescription: {
        fontSize: 16,
        color: "#333",
        textAlign: "center"
      }
    });
  }
});

// ../../node_modules/expo/src/errors/ExpoErrorManager.ts
function createErrorHandler(originalHandler) {
  return (error, isFatal) => originalHandler(error, isFatal);
}
var init_ExpoErrorManager = __esm({
  "../../node_modules/expo/src/errors/ExpoErrorManager.ts"() {
    "use strict";
  }
});

// ../../node_modules/expo/src/Expo.fx.tsx
var import_react_native6, IS_RUNNING_IN_DEV_CLIENT;
var init_Expo_fx = __esm({
  "../../node_modules/expo/src/Expo.fx.tsx"() {
    "use strict";
    init_winter();
    init_async_require();
    import_react_native6 = require("react-native");
    init_ExpoGo();
    init_AppEntryNotFound();
    init_ExpoErrorManager();
    if (__DEV__ && // Disable for SSR
    typeof globalThis.expo !== "undefined") {
      require_messageSocket();
    }
    if (isRunningInExpoGo()) {
      const globalHandler = ErrorUtils.getGlobalHandler();
      ErrorUtils.setGlobalHandler(createErrorHandler(globalHandler));
    }
    IS_RUNNING_IN_DEV_CLIENT = !!import_react_native6.NativeModules.EXDevLauncher;
    if (__DEV__ && import_react_native6.LogBox?.ignoreLogs && (isRunningInExpoGo() || IS_RUNNING_IN_DEV_CLIENT)) {
      import_react_native6.LogBox.ignoreLogs([/Open debugger to view warnings/]);
    }
    if (process.env.NODE_ENV !== "production") {
      import_react_native6.AppRegistry.registerComponent("main", () => AppEntryNotFound);
    }
  }
});

// ../../node_modules/expo/src/Expo.ts
var init_Expo = __esm({
  "../../node_modules/expo/src/Expo.ts"() {
    "use strict";
    init_Expo_fx();
    init_src();
  }
});

// ../../node_modules/expo-haptics/src/ExpoHaptics.ts
var ExpoHaptics_default;
var init_ExpoHaptics = __esm({
  "../../node_modules/expo-haptics/src/ExpoHaptics.ts"() {
    "use strict";
    init_Expo();
    ExpoHaptics_default = requireOptionalNativeModule("ExpoHaptics");
  }
});

// ../../node_modules/expo-haptics/src/Haptics.types.ts
var NotificationFeedbackType, ImpactFeedbackStyle, AndroidHaptics;
var init_Haptics_types = __esm({
  "../../node_modules/expo-haptics/src/Haptics.types.ts"() {
    "use strict";
    NotificationFeedbackType = /* @__PURE__ */ ((NotificationFeedbackType2) => {
      NotificationFeedbackType2["Success"] = "success";
      NotificationFeedbackType2["Warning"] = "warning";
      NotificationFeedbackType2["Error"] = "error";
      return NotificationFeedbackType2;
    })(NotificationFeedbackType || {});
    ImpactFeedbackStyle = /* @__PURE__ */ ((ImpactFeedbackStyle2) => {
      ImpactFeedbackStyle2["Light"] = "light";
      ImpactFeedbackStyle2["Medium"] = "medium";
      ImpactFeedbackStyle2["Heavy"] = "heavy";
      ImpactFeedbackStyle2["Soft"] = "soft";
      ImpactFeedbackStyle2["Rigid"] = "rigid";
      return ImpactFeedbackStyle2;
    })(ImpactFeedbackStyle || {});
    AndroidHaptics = /* @__PURE__ */ ((AndroidHaptics2) => {
      AndroidHaptics2["Confirm"] = "confirm";
      AndroidHaptics2["Reject"] = "reject";
      AndroidHaptics2["Gesture_Start"] = "gesture-start";
      AndroidHaptics2["Gesture_End"] = "gesture-end";
      AndroidHaptics2["Toggle_On"] = "toggle-on";
      AndroidHaptics2["Toggle_Off"] = "toggle-off";
      AndroidHaptics2["Clock_Tick"] = "clock-tick";
      AndroidHaptics2["Context_Click"] = "context-click";
      AndroidHaptics2["Drag_Start"] = "drag-start";
      AndroidHaptics2["Keyboard_Tap"] = "keyboard-tap";
      AndroidHaptics2["Keyboard_Press"] = "keyboard-press";
      AndroidHaptics2["Keyboard_Release"] = "keyboard-release";
      AndroidHaptics2["Long_Press"] = "long-press";
      AndroidHaptics2["Virtual_Key"] = "virtual-key";
      AndroidHaptics2["Virtual_Key_Release"] = "virtual-key-release";
      AndroidHaptics2["No_Haptics"] = "no-haptics";
      AndroidHaptics2["Segment_Tick"] = "segment-tick";
      AndroidHaptics2["Segment_Frequent_Tick"] = "segment-frequent-tick";
      AndroidHaptics2["Text_Handle_Move"] = "text-handle-move";
      return AndroidHaptics2;
    })(AndroidHaptics || {});
  }
});

// ../../node_modules/expo-haptics/src/Haptics.ts
var Haptics_exports = {};
__export(Haptics_exports, {
  AndroidHaptics: () => AndroidHaptics,
  ImpactFeedbackStyle: () => ImpactFeedbackStyle,
  NotificationFeedbackType: () => NotificationFeedbackType,
  impactAsync: () => impactAsync,
  notificationAsync: () => notificationAsync,
  performAndroidHapticsAsync: () => performAndroidHapticsAsync,
  selectionAsync: () => selectionAsync
});
async function notificationAsync(type = "success" /* Success */) {
  if (!ExpoHaptics_default?.notificationAsync) {
    throw new UnavailabilityError("Haptics", "notificationAsync");
  }
  await ExpoHaptics_default.notificationAsync(type);
}
async function impactAsync(style = "medium" /* Medium */) {
  if (!ExpoHaptics_default?.impactAsync) {
    throw new UnavailabilityError("Haptic", "impactAsync");
  }
  await ExpoHaptics_default.impactAsync(style);
}
async function selectionAsync() {
  if (!ExpoHaptics_default?.selectionAsync) {
    throw new UnavailabilityError("Haptic", "selectionAsync");
  }
  await ExpoHaptics_default.selectionAsync();
}
async function performAndroidHapticsAsync(type) {
  if (Platform_default.OS !== "android") {
    return;
  }
  await ExpoHaptics_default.performHapticsAsync(type);
}
var init_Haptics = __esm({
  "../../node_modules/expo-haptics/src/Haptics.ts"() {
    "use strict";
    init_src();
    init_ExpoHaptics();
    init_Haptics_types();
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ThemeProvider: () => ThemeProvider,
  createTheme: () => createTheme,
  dismissAllToasts: () => dismissAllToasts,
  dismissToast: () => dismissToast,
  focusRingAnimation: () => import_tokens2.focusRingAnimation,
  heroTransition: () => heroTransition,
  motionEasing: () => motionEasing,
  motionPresets: () => motionPresets,
  showToast: () => showToast,
  timingPreset: () => import_tokens2.timingPreset,
  useAccordion: () => useAccordion,
  useActiveBrand: () => useActiveBrand,
  useAlert: () => useAlert,
  useAutocomplete: () => useAutocomplete,
  useBottomNavigation: () => useBottomNavigation,
  useBottomSheet: () => useBottomSheet,
  useBrandSwitch: () => useBrandSwitch,
  useCarousel: () => useCarousel,
  useCheckbox: () => useCheckbox,
  useComponentTokens: () => useComponentTokens,
  useDisclosure: () => useDisclosure,
  useDrawer: () => useDrawer,
  useField: () => useField,
  useIconStyle: () => useIconStyle,
  useIsDark: () => useIsDark,
  useListItem: () => useListItem,
  useMemoStyles: () => useMemoStyles,
  useMenu: () => useMenu,
  useModal: () => useModal,
  useOTPInput: () => useOTPInput,
  usePagination: () => usePagination,
  usePressable: () => usePressable,
  useRadioGroup: () => useRadioGroup,
  useRating: () => useRating,
  useScrollHeader: () => useScrollHeader,
  useSegmentedControl: () => useSegmentedControl,
  useSelect: () => useSelect,
  useSlider: () => useSlider,
  useStepper: () => useStepper,
  useSwitch: () => useSwitch,
  useTable: () => useTable,
  useTabs: () => useTabs,
  useTheme: () => useTheme,
  useToast: () => useToast,
  useToggleGroup: () => useToggleGroup,
  useTokens: () => useTokens
});
module.exports = __toCommonJS(index_exports);

// src/theme.tsx
var import_react = __toESM(require("react"));
var import_react_native = require("react-native");
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_tokens = require("@truongdq01/tokens");
function createTheme(override) {
  return override;
}
var ThemeContext = (0, import_react.createContext)(null);
function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  brand: initialBrand,
  override
}) {
  const systemScheme = (0, import_react_native.useColorScheme)();
  const [manualScheme, setManualScheme] = import_react.default.useState(forcedScheme);
  const [activeBrand, setActiveBrand] = import_react.default.useState(initialBrand);
  const activeScheme = manualScheme === "system" ? systemScheme === "dark" ? "dark" : "light" : manualScheme;
  const theme = (0, import_react.useMemo)(() => {
    let tokens = activeBrand ? (0, import_tokens.buildSemanticTokens)(activeBrand, activeScheme) : import_tokens.semanticTokens[activeScheme];
    if (override?.[activeScheme]) {
      tokens = deepMerge(tokens, override[activeScheme]);
    }
    const components = (0, import_tokens.resolveComponentTokens)(tokens);
    return {
      tokens,
      components,
      colorScheme: activeScheme,
      brand: activeBrand,
      setColorScheme: setManualScheme,
      setBrand: setActiveBrand
    };
  }, [activeScheme, activeBrand, override]);
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_gesture_handler.GestureHandlerRootView, { style: { flex: 1 } }, /* @__PURE__ */ import_react.default.createElement(ThemeContext.Provider, { value: theme }, children));
}
function useTheme() {
  const ctx = (0, import_react.useContext)(ThemeContext);
  if (!ctx) {
    throw new Error(
      "[RNUI] useTheme must be used inside <ThemeProvider>. Wrap your app root with <ThemeProvider>."
    );
  }
  return ctx;
}
function useTokens() {
  return useTheme().tokens;
}
function useComponentTokens() {
  return useTheme().components;
}
function useIsDark() {
  return useTheme().colorScheme === "dark";
}
function useActiveBrand() {
  return useTheme().brand;
}
function useBrandSwitch() {
  return useTheme().setBrand;
}
function deepMerge(base, override) {
  const result = { ...base };
  for (const key in override) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (overrideVal !== void 0 && typeof overrideVal === "object" && !Array.isArray(overrideVal) && baseVal !== null && typeof baseVal === "object") {
      result[key] = deepMerge(
        baseVal,
        overrideVal
      );
    } else if (overrideVal !== void 0) {
      result[key] = overrideVal;
    }
  }
  return result;
}

// src/motion.ts
var import_react_native_reanimated = require("react-native-reanimated");
var import_react_native_reanimated2 = require("react-native-reanimated");
var import_tokens2 = require("@truongdq01/tokens");
var motionPresets = {
  enter: {
    fadeUp: import_react_native_reanimated2.FadeInUp,
    fadeDown: import_react_native_reanimated2.FadeInDown,
    fadeIn: import_react_native_reanimated2.FadeIn,
    scaleIn: import_react_native_reanimated2.ZoomIn,
    slideFromBottom: import_react_native_reanimated2.SlideInDown,
    slideFromTop: import_react_native_reanimated2.SlideInUp,
    slideFromRight: import_react_native_reanimated2.SlideInRight
  },
  exit: {
    fadeDown: import_react_native_reanimated2.FadeOutDown,
    fadeUp: import_react_native_reanimated2.FadeOutUp,
    fadeOut: import_react_native_reanimated2.FadeOut,
    scaleOut: import_react_native_reanimated2.ZoomOut,
    slideToBottom: import_react_native_reanimated2.SlideOutDown,
    slideToTop: import_react_native_reanimated2.SlideOutUp,
    slideToRight: import_react_native_reanimated2.SlideOutRight
  }
};
var motionEasing = {
  easeIn: import_react_native_reanimated.Easing.bezier(0.4, 0, 1, 1),
  easeOut: import_react_native_reanimated.Easing.bezier(0, 0, 0.2, 1),
  easeInOut: import_react_native_reanimated.Easing.bezier(0.4, 0, 0.2, 1),
  linear: import_react_native_reanimated.Easing.linear
};
var heroTransition = import_react_native_reanimated.SharedTransition && import_react_native_reanimated.SharedTransition.custom ? import_react_native_reanimated.SharedTransition.custom((values) => {
  "worklet";
  return {
    height: (0, import_react_native_reanimated.withSpring)(values.targetHeight, import_tokens2.spring.snappy),
    width: (0, import_react_native_reanimated.withSpring)(values.targetWidth, import_tokens2.spring.snappy),
    originX: (0, import_react_native_reanimated.withSpring)(values.targetGlobalOriginX, import_tokens2.spring.snappy),
    originY: (0, import_react_native_reanimated.withSpring)(values.targetGlobalOriginY, import_tokens2.spring.snappy)
  };
}) : null;

// src/hooks/usePressable.ts
var import_react5 = require("react");
var import_react_native_reanimated3 = require("react-native-reanimated");
var import_react_native_worklets = require("react-native-worklets");
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var import_react_native7 = require("react-native");
var import_tokens3 = require("@truongdq01/tokens");
function usePressable({
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  disabled = false,
  feedbackMode = "scale",
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  haptic = false,
  hitSlop
} = {}) {
  const [isPressed, setIsPressed] = (0, import_react5.useState)(false);
  const scale = (0, import_react_native_reanimated3.useSharedValue)(1);
  const opacity = (0, import_react_native_reanimated3.useSharedValue)(1);
  const handlePress = (0, import_react5.useCallback)(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("light");
    onPress?.();
  }, [disabled, haptic, onPress]);
  const handleLongPress = (0, import_react5.useCallback)(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("medium");
    onLongPress?.();
  }, [disabled, haptic, onLongPress]);
  const setPressedState = (0, import_react5.useCallback)((pressed) => {
    setIsPressed(pressed);
  }, []);
  const animatedStyle = (0, import_react_native_reanimated3.useAnimatedStyle)(() => {
    if (feedbackMode === "opacity") {
      return { opacity: opacity.value };
    }
    if (feedbackMode === "none") {
      return {};
    }
    return { transform: [{ scale: scale.value }] };
  });
  const scaleDownPressed = import_tokens3.pressFeedback.scaleDown.pressed;
  const scaleSubtlePressed = import_tokens3.pressFeedback.scaleDownSubtle.pressed;
  const opacityOnlyPressed = import_tokens3.pressFeedback.opacityOnly.pressed;
  const snappySpring = import_tokens3.spring.snappy;
  const tapGesture = import_react_native_gesture_handler2.Gesture.Tap().enabled(!disabled).hitSlop(hitSlop ?? 0).onBegin(() => {
    "worklet";
    (0, import_react_native_reanimated3.runOnJS)(setPressedState)(true);
    if (feedbackMode === "scale") {
      scale.value = (0, import_react_native_reanimated3.withSpring)(scaleDownPressed, snappySpring);
    } else if (feedbackMode === "scaleSubtle") {
      scale.value = (0, import_react_native_reanimated3.withSpring)(scaleSubtlePressed, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = (0, import_react_native_reanimated3.withTiming)(opacityOnlyPressed, { duration: 60 });
    }
  }).onFinalize((_event, success) => {
    "worklet";
    (0, import_react_native_reanimated3.runOnJS)(setPressedState)(false);
    if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
      scale.value = (0, import_react_native_reanimated3.withSpring)(1, snappySpring);
    } else if (feedbackMode === "opacity") {
      opacity.value = (0, import_react_native_reanimated3.withTiming)(1, { duration: 100 });
    }
    if (success) {
      (0, import_react_native_worklets.scheduleOnRN)(handlePress);
    }
  });
  const longPressGesture = import_react_native_gesture_handler2.Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(longPressMinDuration).onStart(() => {
    "worklet";
    (0, import_react_native_worklets.scheduleOnRN)(handleLongPress);
  });
  const gesture = import_react_native_gesture_handler2.Gesture.Simultaneous(tapGesture, longPressGesture);
  const accessibilityProps = {
    accessible: true,
    accessibilityRole,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState: { disabled }
  };
  return {
    animatedStyle,
    gesture,
    accessibilityProps,
    isPressed
  };
}
function triggerHaptic(type) {
  try {
    const Haptics = (init_Haptics(), __toCommonJS(Haptics_exports));
    const map = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy
    };
    Haptics.impactAsync(map[type]);
    return;
  } catch {
  }
  try {
    const HapticFeedback = require("react-native-haptic-feedback").default;
    HapticFeedback.trigger(
      import_react_native7.Platform.OS === "ios" ? "impactLight" : "notificationSuccess",
      { enableVibrateFallback: true, ignoreAndroidSystemSettings: false }
    );
  } catch {
  }
}

// src/hooks/useDisclosure.ts
var import_react6 = require("react");
function useDisclosure({
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpen,
  onClose
} = {}) {
  const [internalOpen, setInternalOpen] = (0, import_react6.useState)(defaultOpen);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const open = (0, import_react6.useCallback)(() => {
    if (controlledOpen === void 0) setInternalOpen(true);
    onOpen?.();
  }, [controlledOpen, onOpen]);
  const close = (0, import_react6.useCallback)(() => {
    if (controlledOpen === void 0) setInternalOpen(false);
    onClose?.();
  }, [controlledOpen, onClose]);
  const toggle = (0, import_react6.useCallback)(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);
  return {
    isOpen,
    open,
    close,
    toggle,
    triggerProps: {
      onPress: toggle,
      accessibilityState: { expanded: isOpen }
    },
    contentProps: {
      accessibilityViewIsModal: isOpen
    }
  };
}

// src/hooks/useField.ts
var import_react7 = require("react");
function useField({
  defaultValue,
  validate,
  validateOnChange = false
}) {
  const [value, setValue] = (0, import_react7.useState)(defaultValue);
  const [error, setError] = (0, import_react7.useState)(void 0);
  const [touched, setTouched] = (0, import_react7.useState)(false);
  const [isValidating, setIsValidating] = (0, import_react7.useState)(false);
  const runValidation = (0, import_react7.useCallback)(
    async (val) => {
      if (!validate) return;
      setIsValidating(true);
      try {
        const result = await validate(val);
        setError(result);
        return result;
      } catch {
        const errorMsg = "Validation failed";
        setError(errorMsg);
        return errorMsg;
      } finally {
        setIsValidating(false);
      }
    },
    [validate]
  );
  const onChange = (0, import_react7.useCallback)(
    (val) => {
      setValue(val);
      if (validateOnChange && touched) {
        runValidation(val);
      } else if (error) {
        setError(void 0);
      }
    },
    [validateOnChange, touched, error, runValidation]
  );
  const onBlur = (0, import_react7.useCallback)(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);
  const reset = (0, import_react7.useCallback)(() => {
    setValue(defaultValue);
    setError(void 0);
    setTouched(false);
    setIsValidating(false);
  }, [defaultValue]);
  return {
    value,
    error,
    touched,
    isValidating,
    onChange,
    onBlur,
    reset,
    setError,
    validate: () => runValidation(value),
    inputProps: {
      value: String(value),
      onChangeText: (text) => onChange(text),
      onBlur
    }
  };
}

// src/hooks/useToast.ts
var import_react8 = require("react");
var store = {
  queue: [],
  listeners: /* @__PURE__ */ new Set()
};
function notify() {
  store.listeners.forEach((l) => l());
}
function getSnapshot() {
  return store.queue;
}
function subscribe(listener) {
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
}
var _idCounter = 0;
function showToast(options) {
  const id2 = `toast-${++_idCounter}`;
  const item = {
    id: id2,
    message: options.message,
    variant: options.variant ?? "default",
    duration: options.duration ?? 3500,
    persistent: options.persistent ?? false,
    action: options.action,
    icon: options.icon
  };
  store.queue = [...store.queue.slice(-2), item];
  notify();
  return id2;
}
function dismissToast(id2) {
  store.queue = store.queue.filter((t) => t.id !== id2);
  notify();
}
function dismissAllToasts() {
  store.queue = [];
  notify();
}
function useToast() {
  const toasts = (0, import_react8.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
  const show = (0, import_react8.useCallback)((options) => showToast(options), []);
  const dismiss = (0, import_react8.useCallback)((id2) => dismissToast(id2), []);
  const dismissAll = (0, import_react8.useCallback)(() => dismissAllToasts(), []);
  const success = (0, import_react8.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "success" }),
    []
  );
  const error = (0, import_react8.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "error" }),
    []
  );
  const warning = (0, import_react8.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "warning" }),
    []
  );
  const info = (0, import_react8.useCallback)(
    (message, opts) => showToast({ ...opts, message, variant: "info" }),
    []
  );
  return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}

// src/hooks/useBottomSheet.ts
var import_react9 = require("react");
var import_react_native_reanimated4 = require("react-native-reanimated");
var import_react_native_worklets2 = require("react-native-worklets");
var import_react_native_gesture_handler3 = require("react-native-gesture-handler");
var import_react_native8 = require("react-native");
var import_tokens4 = require("@truongdq01/tokens");
var SCREEN_HEIGHT = import_react_native8.Dimensions.get("window").height;
function resolveSnapPoint(point) {
  if (typeof point === "number") return point;
  const pct = parseFloat(point) / 100;
  return SCREEN_HEIGHT * pct;
}
function useBottomSheet({
  snapPoints: rawSnapPoints = ["50%"],
  initialSnapIndex,
  onClose,
  onSnapChange,
  enableDismissOnSwipe = true,
  enableBackdrop = true
} = {}) {
  const snapPoints = rawSnapPoints.map(resolveSnapPoint);
  const defaultSnapIndex = initialSnapIndex ?? snapPoints.length - 1;
  const isOpenRef = (0, import_react9.useRef)(false);
  const currentIndexRef = (0, import_react9.useRef)(defaultSnapIndex);
  const translateY = (0, import_react_native_reanimated4.useSharedValue)(SCREEN_HEIGHT);
  const backdropOpacity = (0, import_react_native_reanimated4.useSharedValue)(0);
  const dragStartY = (0, import_react_native_reanimated4.useSharedValue)(0);
  const gentleSpring = import_tokens4.spring.gentle;
  const animateToSnap = (0, import_react9.useCallback)(
    (index, onDone) => {
      "worklet";
      const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = (0, import_react_native_reanimated4.withSpring)(targetY, gentleSpring, (finished) => {
        if (finished && onDone) (0, import_react_native_worklets2.scheduleOnRN)(onDone);
      });
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]
  );
  const open = (0, import_react9.useCallback)(
    (snapIndex) => {
      const idx = snapIndex ?? defaultSnapIndex;
      isOpenRef.current = true;
      currentIndexRef.current = idx;
      const targetHeight = snapPoints[idx] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== "number" || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for open:", targetY);
        return;
      }
      translateY.value = (0, import_react_native_reanimated4.withSpring)(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const handleCloseEnd = (0, import_react9.useCallback)(() => {
    isOpenRef.current = false;
    onClose?.();
  }, [onClose]);
  const close = (0, import_react9.useCallback)(() => {
    translateY.value = (0, import_react_native_reanimated4.withSpring)(SCREEN_HEIGHT, gentleSpring, (finished) => {
      if (finished) {
        (0, import_react_native_worklets2.scheduleOnRN)(handleCloseEnd);
      }
    });
    backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(0, { duration: 200 });
  }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);
  const snapTo = (0, import_react9.useCallback)(
    (index) => {
      if (index < 0 || index >= snapPoints.length) return;
      currentIndexRef.current = index;
      const targetHeight = snapPoints[index];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== "number" || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for snapTo:", targetY);
        return;
      }
      translateY.value = (0, import_react_native_reanimated4.withSpring)(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = (0, import_react_native_reanimated4.withTiming)(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );
  const panGesture = import_react_native_gesture_handler3.Gesture.Pan().onStart(() => {
    "worklet";
    dragStartY.value = translateY.value;
  }).onUpdate((e) => {
    "worklet";
    const next = dragStartY.value + e.translationY;
    const minY = SCREEN_HEIGHT - Math.max(...snapPoints);
    if (next < minY) {
      translateY.value = minY + (next - minY) * 0.15;
    } else {
      translateY.value = next;
    }
    const currentHeight = SCREEN_HEIGHT - translateY.value;
    const maxHeight = Math.max(...snapPoints);
    backdropOpacity.value = enableBackdrop ? Math.max(0, currentHeight / maxHeight * 0.6) : 0;
  }).onEnd((e) => {
    "worklet";
    const velocity = e.velocityY;
    const currentHeight = SCREEN_HEIGHT - translateY.value;
    if (velocity > 800 && enableDismissOnSwipe) {
      (0, import_react_native_worklets2.scheduleOnRN)(close);
      return;
    }
    let bestIndex = 0;
    let bestDist = Infinity;
    for (let i = 0; i < snapPoints.length; i++) {
      const dist = Math.abs(snapPoints[i] - currentHeight);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }
    (0, import_react_native_worklets2.scheduleOnRN)(snapTo, bestIndex);
  });
  const backdropTapGesture = import_react_native_gesture_handler3.Gesture.Tap().onEnd(() => {
    "worklet";
    (0, import_react_native_worklets2.scheduleOnRN)(close);
  });
  const sheetAnimatedStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  const backdropAnimatedStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? "auto" : "none"
  }));
  return {
    isOpen: isOpenRef.current,
    open,
    close,
    snapTo,
    currentSnapIndex: currentIndexRef.current,
    sheetAnimatedStyle,
    backdropAnimatedStyle,
    panGesture,
    backdropTapGesture
  };
}

// src/hooks/useCheckbox.ts
var import_react10 = require("react");
function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false
} = {}) {
  const [internalChecked, setInternalChecked] = (0, import_react10.useState)(defaultChecked);
  const isChecked = controlledChecked !== void 0 ? controlledChecked : internalChecked;
  const toggle = (0, import_react10.useCallback)(() => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === void 0) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, controlledChecked, onChange]);
  return {
    isChecked,
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "checkbox",
      accessibilityState: {
        checked: indeterminate ? "mixed" : isChecked,
        disabled
      }
    }
  };
}

// src/hooks/useSwitch.ts
var import_react11 = require("react");
function useSwitch({
  defaultOn = false,
  on: controlledOn,
  onChange,
  disabled = false
} = {}) {
  const [internalOn, setInternalOn] = (0, import_react11.useState)(defaultOn);
  const isOn = controlledOn !== void 0 ? controlledOn : internalOn;
  const toggle = (0, import_react11.useCallback)(() => {
    if (disabled) return;
    const next = !isOn;
    if (controlledOn === void 0) setInternalOn(next);
    onChange?.(next);
  }, [disabled, isOn, controlledOn, onChange]);
  return {
    isOn,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "switch",
      accessibilityState: { checked: isOn, disabled }
    }
  };
}

// src/hooks/useSelect.ts
var import_react12 = require("react");
function useSelect({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  multiple = false,
  disabled = false,
  placeholder = "Select\u2026"
}) {
  const [internalValue, setInternalValue] = (0, import_react12.useState)(defaultValue);
  const disclosure = useDisclosure();
  const selected = controlledValue !== void 0 ? controlledValue : internalValue;
  const selectOption = (0, import_react12.useCallback)(
    (val) => {
      if (disabled) return;
      let next;
      if (multiple) {
        const arr = Array.isArray(selected) ? selected : [];
        next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
      } else {
        next = val;
        disclosure.close();
      }
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, multiple, selected, controlledValue, onChange, disclosure]
  );
  const clearSelection = (0, import_react12.useCallback)(() => {
    const next = multiple ? [] : void 0;
    if (controlledValue === void 0) setInternalValue(next);
    if (next !== void 0) onChange?.(next);
  }, [multiple, controlledValue, onChange]);
  const isSelected = (0, import_react12.useCallback)(
    (val) => {
      if (!selected) return false;
      if (Array.isArray(selected)) return selected.includes(val);
      return selected === val;
    },
    [selected]
  );
  const displayLabel = (() => {
    if (!selected || Array.isArray(selected) && selected.length === 0) return placeholder;
    if (Array.isArray(selected)) {
      const labels = selected.map((v) => options.find((o) => o.value === v)?.label).filter(Boolean);
      return labels.join(", ");
    }
    return options.find((o) => o.value === selected)?.label ?? placeholder;
  })();
  return {
    selected,
    isOpen: disclosure.isOpen,
    open: disclosure.open,
    close: disclosure.close,
    toggle: disclosure.toggle,
    selectOption,
    clearSelection,
    isSelected,
    displayLabel,
    triggerProps: {
      onPress: disabled ? () => {
      } : disclosure.toggle,
      accessibilityState: { expanded: disclosure.isOpen, disabled }
    }
  };
}

// src/hooks/useScrollHeader.ts
var import_react_native_reanimated5 = require("react-native-reanimated");
function useScrollHeader({ headerMaxHeight, headerMinHeight }) {
  const scrollY = (0, import_react_native_reanimated5.useSharedValue)(0);
  const scrollHandler = (0, import_react_native_reanimated5.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });
  const scrollDistance = headerMaxHeight - headerMinHeight;
  const headerStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const height = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [0, scrollDistance],
      [headerMaxHeight, headerMinHeight],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    return { height };
  });
  const imageStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const translateY = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [-headerMaxHeight, 0, scrollDistance],
      [-headerMaxHeight / 2, 0, scrollDistance * 0.5],
      // Moves at half speed relative to scroll
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    const scale = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [-headerMaxHeight, 0],
      [2, 1],
      { extrapolateLeft: import_react_native_reanimated5.Extrapolation.EXTEND, extrapolateRight: import_react_native_reanimated5.Extrapolation.CLAMP }
    );
    return {
      transform: [{ translateY }, { scale }]
    };
  });
  const titleStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const opacity = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance * 0.9],
      [0, 1],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    const translateY = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance],
      [10, 0],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }]
    };
  });
  const headerBgStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => {
    const opacity = (0, import_react_native_reanimated5.interpolate)(
      scrollY.value,
      [0, scrollDistance],
      [0, 1],
      import_react_native_reanimated5.Extrapolation.CLAMP
    );
    return { opacity };
  });
  return {
    scrollY,
    scrollHandler,
    headerStyle,
    imageStyle,
    titleStyle,
    headerBgStyle
  };
}

// src/hooks/useMemoStyles.ts
var import_react13 = require("react");
var import_react_native9 = require("react-native");
function useMemoStyles(styleFactory) {
  const tokens = useTokens();
  const factoryRef = (0, import_react13.useRef)(styleFactory);
  factoryRef.current = styleFactory;
  return (0, import_react13.useMemo)(() => {
    const rawStyles = factoryRef.current(tokens);
    return import_react_native9.StyleSheet.create(rawStyles);
  }, [tokens]);
}

// src/hooks/useListItem.ts
var import_react14 = require("react");
var import_react_native_reanimated6 = require("react-native-reanimated");
var import_react_native_worklets3 = require("react-native-worklets");
var import_react_native_gesture_handler4 = require("react-native-gesture-handler");
var import_tokens5 = require("@truongdq01/tokens");
var ACTION_WIDTH = 80;
function useListItem({
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false
} = {}) {
  const translateX = (0, import_react_native_reanimated6.useSharedValue)(0);
  const isRevealedValue = (0, import_react_native_reanimated6.useSharedValue)(false);
  const trailingMax = trailingActions.length * ACTION_WIDTH;
  const leadingMax = leadingActions.length * ACTION_WIDTH;
  const snappySpring = import_tokens5.spring.snappy;
  const close = (0, import_react14.useCallback)(() => {
    translateX.value = (0, import_react_native_reanimated6.withSpring)(0, snappySpring);
    isRevealedValue.value = false;
  }, [translateX, isRevealedValue, snappySpring]);
  const tapGesture = import_react_native_gesture_handler4.Gesture.Tap().enabled(!disabled).onEnd((_, success) => {
    "worklet";
    if (!success) return;
    if (isRevealedValue.value) {
      translateX.value = (0, import_react_native_reanimated6.withSpring)(0, snappySpring);
      isRevealedValue.value = false;
      return;
    }
    if (onPress) (0, import_react_native_worklets3.scheduleOnRN)(onPress);
  });
  const longPressGesture = import_react_native_gesture_handler4.Gesture.LongPress().enabled(!disabled && !!onLongPress).minDuration(500).onStart(() => {
    "worklet";
    if (onLongPress) (0, import_react_native_worklets3.scheduleOnRN)(onLongPress);
  });
  const panGesture = import_react_native_gesture_handler4.Gesture.Pan().activeOffsetX([-8, 8]).failOffsetY([-5, 5]).onUpdate((e) => {
    "worklet";
    const raw = e.translationX;
    if (raw < 0 && trailingMax > 0) {
      translateX.value = Math.max(raw, -trailingMax - 10);
    } else if (raw > 0 && leadingMax > 0) {
      translateX.value = Math.min(raw, leadingMax + 10);
    }
  }).onEnd((e) => {
    "worklet";
    const vel = e.velocityX;
    const tx = translateX.value;
    if (tx < 0 && trailingMax > 0) {
      const snap = tx < -trailingMax / 2 || vel < -300;
      translateX.value = (0, import_react_native_reanimated6.withSpring)(snap ? -trailingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else if (tx > 0 && leadingMax > 0) {
      const snap = tx > leadingMax / 2 || vel > 300;
      translateX.value = (0, import_react_native_reanimated6.withSpring)(snap ? leadingMax : 0, snappySpring);
      isRevealedValue.value = snap;
    } else {
      translateX.value = (0, import_react_native_reanimated6.withSpring)(0, snappySpring);
      isRevealedValue.value = false;
    }
  });
  const gesture = import_react_native_gesture_handler4.Gesture.Simultaneous(
    import_react_native_gesture_handler4.Gesture.Race(panGesture, tapGesture),
    longPressGesture
  );
  const itemAnimatedStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    transform: [{ translateX: translateX.value }]
  }));
  const trailingActionsStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    width: Math.abs(Math.min(translateX.value, 0)),
    opacity: (0, import_react_native_reanimated6.interpolate)(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], import_react_native_reanimated6.Extrapolation.CLAMP)
  }));
  const leadingActionsStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
    width: Math.max(translateX.value, 0),
    opacity: (0, import_react_native_reanimated6.interpolate)(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], import_react_native_reanimated6.Extrapolation.CLAMP)
  }));
  return {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "button",
      accessibilityState: { disabled }
    },
    close
  };
}

// src/hooks/useRadioGroup.ts
var import_react15 = require("react");
function useRadioGroup({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react15.useState)(defaultValue);
  const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const select2 = (0, import_react15.useCallback)(
    (val) => {
      if (disabled) return;
      if (controlledValue === void 0) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, controlledValue, onChange]
  );
  const isSelected = (0, import_react15.useCallback)(
    (val) => selectedValue === val,
    [selectedValue]
  );
  const getItemProps = (0, import_react15.useCallback)(
    (val, itemDisabled = false) => ({
      onPress: () => !itemDisabled && !disabled && select2(val),
      accessibilityRole: "radio",
      accessibilityState: {
        checked: isSelected(val),
        disabled: disabled || itemDisabled
      }
    }),
    [select2, isSelected, disabled]
  );
  return { selectedValue, select: select2, isSelected, isDisabled: disabled, getItemProps };
}

// src/hooks/useSlider.ts
var import_react16 = require("react");
var import_react_native_reanimated7 = require("react-native-reanimated");
var import_react_native_worklets4 = require("react-native-worklets");
var import_react_native_gesture_handler5 = require("react-native-gesture-handler");
var import_tokens6 = require("@truongdq01/tokens");
function snapToStep(value, min, max, step) {
  const snapped = Math.round((value - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}
function useSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = min,
  value: controlledValue,
  onChange,
  onChangeEnd,
  disabled = false
} = {}) {
  const trackWidth = (0, import_react_native_reanimated7.useSharedValue)(0);
  const internalValue = (0, import_react16.useRef)(controlledValue ?? defaultValue);
  const currentValue = controlledValue ?? internalValue.current;
  const percentage = (currentValue - min) / (max - min);
  const thumbRatio = (0, import_react_native_reanimated7.useSharedValue)(percentage);
  const isDragging = (0, import_react_native_reanimated7.useSharedValue)(false);
  const dragStartRatio = (0, import_react_native_reanimated7.useSharedValue)(0);
  const thumbScale = (0, import_react_native_reanimated7.useSharedValue)(1);
  const onTrackLayout = (0, import_react16.useCallback)(
    (width) => {
      trackWidth.value = width;
    },
    [trackWidth]
  );
  const emitChange = (0, import_react16.useCallback)(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValue.current = snapped;
      onChange?.(snapped);
    },
    [min, max, step, onChange]
  );
  const emitChangeEnd = (0, import_react16.useCallback)(
    (ratio) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEnd?.(snapped);
    },
    [min, max, step, onChangeEnd]
  );
  const snappySpringConfig = import_tokens6.spring.snappy;
  const lastEmittedValue = (0, import_react_native_reanimated7.useSharedValue)(currentValue);
  const panGesture = import_react_native_gesture_handler5.Gesture.Pan().enabled(!disabled).onStart(() => {
    "worklet";
    isDragging.value = true;
    thumbScale.value = (0, import_react_native_reanimated7.withSpring)(1.2, snappySpringConfig);
    dragStartRatio.value = thumbRatio.value;
  }).onUpdate((e) => {
    "worklet";
    if (trackWidth.value === 0) return;
    const delta = e.translationX / trackWidth.value;
    const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
    thumbRatio.value = next;
    const raw = next * (max - min) + min;
    const snapped = Math.round((raw - min) / step) * step + min;
    const finalSnapped = Math.max(min, Math.min(max, snapped));
    if (finalSnapped !== lastEmittedValue.value) {
      lastEmittedValue.value = finalSnapped;
      (0, import_react_native_worklets4.scheduleOnRN)(emitChange, next);
    }
  }).onEnd(() => {
    "worklet";
    isDragging.value = false;
    thumbScale.value = (0, import_react_native_reanimated7.withSpring)(1, snappySpringConfig);
    const raw = thumbRatio.value * (max - min) + min;
    const snapped = Math.round((raw - min) / step) * step + min;
    const finalSnapped = Math.max(min, Math.min(max, snapped));
    const targetRatio = (finalSnapped - min) / (max - min);
    thumbRatio.value = (0, import_react_native_reanimated7.withSpring)(targetRatio, snappySpringConfig);
    (0, import_react_native_worklets4.scheduleOnRN)(emitChangeEnd, targetRatio);
  });
  const thumbAnimatedStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => {
    const width = trackWidth.value;
    const ratio = thumbRatio.value;
    const scale = thumbScale.value;
    return {
      transform: [
        { translateX: ratio * width },
        { scale }
      ]
    };
  });
  const fillAnimatedStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => {
    const ratio = thumbRatio.value;
    return {
      width: `${ratio * 100}%`
    };
  });
  const trackAnimatedStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => ({
    opacity: disabled ? 0.4 : 1
  }));
  return {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage
  };
}

// src/hooks/useIconStyle.ts
function useIconStyle(context) {
  const tokens = useTokens();
  if (context === "button") {
    return {
      size: tokens.fontSize.md,
      color: "inherit"
      // Components should handle setting this based on variant
    };
  }
  if (context === "input" || context === "select") {
    return {
      size: tokens.fontSize.lg,
      // Search icons and chevrons usually slightly larger
      color: tokens.color.text.tertiary
    };
  }
  if (context === "list") {
    return {
      size: tokens.fontSize.md,
      color: tokens.color.text.secondary
    };
  }
  return {
    size: tokens.fontSize.md,
    color: tokens.color.text.primary
  };
}

// src/hooks/useTabs.ts
var import_react17 = require("react");
function useTabs({
  defaultValue,
  value: controlledValue,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react17.useState)(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (0, import_react17.useCallback)(
    (next) => {
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );
  const isSelected = (0, import_react17.useCallback)(
    (v) => value === v,
    [value]
  );
  const getTabProps = (0, import_react17.useCallback)(
    (v, disabled = false) => ({
      onPress: () => {
        if (disabled) return;
        setValue(v);
      },
      accessibilityRole: "tab",
      accessibilityState: { selected: value === v, disabled }
    }),
    [setValue, value]
  );
  return { value, setValue, isSelected, getTabProps };
}

// src/hooks/useToggleGroup.ts
var import_react18 = require("react");
function useToggleGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  exclusive = false,
  disabled = false
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react18.useState)(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const isSelected = (0, import_react18.useCallback)(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const toggle = (0, import_react18.useCallback)(
    (v) => {
      if (disabled) return;
      let next;
      if (exclusive) {
        next = value === v ? void 0 : v;
      } else {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      }
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, exclusive, value, controlledValue, onChange]
  );
  return { value, isSelected, toggle };
}

// src/hooks/useRating.ts
var import_react19 = require("react");
function useRating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  onChange
} = {}) {
  const [internalValue, setInternalValue] = (0, import_react19.useState)(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const setValue = (0, import_react19.useCallback)(
    (next) => {
      if (disabled || readOnly) return;
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, readOnly, controlledValue, onChange]
  );
  return { value, setValue, max, precision, disabled, readOnly };
}

// src/hooks/usePagination.ts
var import_react20 = require("react");
function range(start, end) {
  const length = end - start + 1;
  if (length <= 0) return [];
  const arr = new Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = start + i;
  }
  return arr;
}
function usePagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onChange
}) {
  const [internalPage, setInternalPage] = (0, import_react20.useState)(defaultPage);
  const page = controlledPage ?? internalPage;
  const setPage = (0, import_react20.useCallback)(
    (next) => {
      const clamped = Math.max(1, Math.min(count, next));
      if (controlledPage === void 0) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [count, controlledPage, onChange]
  );
  const items = (0, import_react20.useMemo)(() => {
    if (count <= 0) return [];
    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
    const siblingsStart = Math.max(
      Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );
    const result = [];
    result.push(...startPages);
    if (siblingsStart > boundaryCount + 2) {
      result.push("start-ellipsis");
    } else if (boundaryCount + 1 < count - boundaryCount) {
      result.push(boundaryCount + 1);
    }
    result.push(...range(siblingsStart, siblingsEnd));
    if (siblingsEnd < count - boundaryCount - 1) {
      result.push("end-ellipsis");
    } else if (count - boundaryCount > boundaryCount) {
      result.push(count - boundaryCount);
    }
    result.push(...endPages);
    return Array.from(new Set(result)).filter((item) => {
      if (typeof item === "number") return item >= 1 && item <= count;
      return true;
    });
  }, [count, page, siblingCount, boundaryCount]);
  return { page, setPage, items };
}

// src/hooks/useAutocomplete.ts
var import_react21 = require("react");
function useAutocomplete({
  options,
  value: controlledValue,
  defaultValue,
  multiple = false,
  inputValue: controlledInput,
  defaultInputValue = "",
  onInputChange,
  onChange,
  getOptionLabel,
  filterOptions,
  open: controlledOpen,
  onOpen,
  onClose
}) {
  const [internalValue, setInternalValue] = (0, import_react21.useState)(defaultValue);
  const [internalInput, setInternalInput] = (0, import_react21.useState)(defaultInputValue);
  const disclosure = useDisclosure({
    isOpen: controlledOpen,
    onOpen,
    onClose
  });
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const inputValue = controlledInput !== void 0 ? controlledInput : internalInput;
  const setInputValue = (0, import_react21.useCallback)(
    (next) => {
      if (controlledInput === void 0) setInternalInput(next);
      onInputChange?.(next);
    },
    [controlledInput, onInputChange]
  );
  const isSelected = (0, import_react21.useCallback)(
    (v) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );
  const selectOption = (0, import_react21.useCallback)(
    (v) => {
      let next;
      if (multiple) {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      } else {
        next = v;
        disclosure.close();
      }
      if (controlledValue === void 0) setInternalValue(next);
      onChange?.(next);
      if (!multiple) {
        const label = getOptionLabel ? getOptionLabel(v) : String(v);
        setInputValue(label);
      }
    },
    [multiple, value, controlledValue, onChange, disclosure, getOptionLabel, setInputValue]
  );
  const clear = (0, import_react21.useCallback)(() => {
    if (controlledValue === void 0) setInternalValue(multiple ? [] : void 0);
    onChange?.(multiple ? [] : void 0);
    setInputValue("");
  }, [controlledValue, multiple, onChange, setInputValue]);
  const filteredOptions = (0, import_react21.useMemo)(() => {
    const base = filterOptions ? filterOptions(options, inputValue) : options;
    if (!inputValue) return base;
    const labelOf = getOptionLabel ?? ((o) => String(o));
    return base.filter((opt) => labelOf(opt).toLowerCase().includes(inputValue.toLowerCase()));
  }, [options, inputValue, filterOptions, getOptionLabel]);
  return {
    value,
    inputValue,
    setInputValue,
    isOpen: disclosure.isOpen,
    open: disclosure.open,
    close: disclosure.close,
    isSelected,
    selectOption,
    clear,
    filteredOptions
  };
}

// src/hooks/useAccordion.ts
var import_react22 = require("react");
function useAccordion(options = {}) {
  const {
    defaultExpanded = [],
    expanded: controlledExpanded,
    onChange,
    multiple = false
  } = options;
  const [internalExpanded, setInternalExpanded] = (0, import_react22.useState)(defaultExpanded);
  const isControlled = controlledExpanded !== void 0;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const setExpanded = (0, import_react22.useCallback)((next) => {
    if (!isControlled) setInternalExpanded(next);
    onChange?.(next);
  }, [isControlled, onChange]);
  const isExpanded = (0, import_react22.useCallback)((id2) => expanded.includes(id2), [expanded]);
  const toggle = (0, import_react22.useCallback)((id2) => {
    if (isExpanded(id2)) {
      setExpanded(expanded.filter((e) => e !== id2));
    } else {
      setExpanded(multiple ? [...expanded, id2] : [id2]);
    }
  }, [expanded, isExpanded, multiple, setExpanded]);
  const expand = (0, import_react22.useCallback)((id2) => {
    if (!isExpanded(id2)) setExpanded(multiple ? [...expanded, id2] : [id2]);
  }, [expanded, isExpanded, multiple, setExpanded]);
  const collapse = (0, import_react22.useCallback)((id2) => {
    setExpanded(expanded.filter((e) => e !== id2));
  }, [expanded, setExpanded]);
  const expandAll = (0, import_react22.useCallback)((ids) => {
    if (multiple) setExpanded(ids);
  }, [multiple, setExpanded]);
  const collapseAll = (0, import_react22.useCallback)(() => setExpanded([]), [setExpanded]);
  return { expanded, isExpanded, toggle, expand, collapse, expandAll, collapseAll };
}

// src/hooks/useModal.ts
var import_react23 = require("react");
function useModal(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    closeOnBackdrop = true
  } = options;
  const [internalOpen, setInternalOpen] = (0, import_react23.useState)(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (0, import_react23.useCallback)((next) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);
  const open = (0, import_react23.useCallback)(() => setOpen(true), [setOpen]);
  const close = (0, import_react23.useCallback)(() => setOpen(false), [setOpen]);
  const toggle = (0, import_react23.useCallback)(() => setOpen(!isOpen), [isOpen, setOpen]);
  return {
    isOpen,
    open,
    close,
    toggle,
    backdropProps: {
      onPress: closeOnBackdrop ? close : () => {
      },
      accessible: true,
      accessibilityRole: "button",
      accessibilityLabel: "Close modal"
    },
    modalProps: {
      visible: isOpen,
      onRequestClose: close,
      accessibilityViewIsModal: true
    }
  };
}

// src/hooks/useDrawer.ts
var import_react24 = require("react");
function useDrawer(options = {}) {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    side = "left",
    closeOnBackdrop = true
  } = options;
  const [internalOpen, setInternalOpen] = (0, import_react24.useState)(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (0, import_react24.useCallback)((next) => {
    if (!isControlled) setInternalOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  }, [isControlled, onOpen, onClose]);
  const open = (0, import_react24.useCallback)(() => setOpen(true), [setOpen]);
  const close = (0, import_react24.useCallback)(() => setOpen(false), [setOpen]);
  const toggle = (0, import_react24.useCallback)(() => setOpen(!isOpen), [isOpen, setOpen]);
  return {
    isOpen,
    side,
    open,
    close,
    toggle,
    backdropProps: {
      onPress: closeOnBackdrop ? close : () => {
      },
      accessible: true,
      accessibilityRole: "button",
      accessibilityLabel: "Close drawer"
    },
    drawerProps: {
      visible: isOpen,
      accessibilityViewIsModal: true
    }
  };
}

// src/hooks/useStepper.ts
var import_react25 = require("react");
function useStepper(options) {
  const { steps, initialStep = 0, onChange, onComplete, linear = true } = options;
  const [currentStep, setCurrentStep] = (0, import_react25.useState)(initialStep);
  const [completedSteps, setCompletedSteps] = (0, import_react25.useState)(/* @__PURE__ */ new Set());
  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const next = (0, import_react25.useCallback)(async () => {
    const step = steps[currentStep];
    if (step.validate) {
      const valid = await step.validate();
      if (!valid) return false;
    }
    setCompletedSteps((prev2) => /* @__PURE__ */ new Set([...prev2, currentStep]));
    if (!isLast) {
      const next2 = currentStep + 1;
      setCurrentStep(next2);
      onChange?.(next2);
    }
    return true;
  }, [currentStep, isLast, steps, onChange]);
  const prev = (0, import_react25.useCallback)(() => {
    if (!isFirst) {
      const prev2 = currentStep - 1;
      setCurrentStep(prev2);
      onChange?.(prev2);
    }
  }, [currentStep, isFirst, onChange]);
  const goTo = (0, import_react25.useCallback)((index) => {
    if (index < 0 || index >= totalSteps) return;
    if (linear && index > currentStep && !completedSteps.has(index - 1)) return;
    setCurrentStep(index);
    onChange?.(index);
  }, [totalSteps, linear, currentStep, completedSteps, onChange]);
  const complete = (0, import_react25.useCallback)(() => {
    setCompletedSteps((prev2) => /* @__PURE__ */ new Set([...prev2, currentStep]));
    onComplete?.();
  }, [currentStep, onComplete]);
  const reset = (0, import_react25.useCallback)(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(/* @__PURE__ */ new Set());
  }, [initialStep]);
  const getStepProps = (0, import_react25.useCallback)((index) => ({
    active: index === currentStep,
    completed: completedSteps.has(index),
    accessible: true,
    accessibilityRole: "tab",
    accessibilitySelected: index === currentStep,
    accessibilityLabel: `${steps[index]?.label}${completedSteps.has(index) ? ", completed" : ""}${index === currentStep ? ", current" : ""}`
  }), [currentStep, completedSteps, steps]);
  return { currentStep, totalSteps, isFirst, isLast, completedSteps, next, prev, goTo, complete, reset, getStepProps };
}

// src/hooks/useCarousel.ts
var import_react26 = require("react");
var import_react_native10 = require("react-native");
var import_react_native_reanimated8 = require("react-native-reanimated");
var { width: SCREEN_WIDTH } = import_react_native10.Dimensions.get("window");
function useCarousel({
  data,
  itemWidth = SCREEN_WIDTH,
  gap = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3e3
}) {
  const scrollX = (0, import_react_native_reanimated8.useSharedValue)(0);
  const scrollViewRef = (0, import_react26.useRef)(null);
  const isJumping = (0, import_react26.useRef)(false);
  const autoPlayTimer = (0, import_react26.useRef)(null);
  const n = data.length;
  const itemStep = itemWidth + gap;
  const displayData = (0, import_react26.useMemo)(() => {
    if (!loop || n < 2) return data;
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);
  const snapToOffsets = (0, import_react26.useMemo)(() => {
    return displayData.map((_, i) => i * itemStep);
  }, [displayData, itemStep]);
  (0, import_react26.useEffect)(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
        scrollX.value = itemStep;
      });
    }
  }, []);
  const goToNextSlide = (0, import_react26.useCallback)(() => {
    if (!loop || n < 2) {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextIndex = currentIndex >= n - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * itemStep, animated: true });
    } else {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextX = (currentIndex + 1) * itemStep;
      if (nextX < displayData.length * itemStep) {
        scrollViewRef.current?.scrollTo({ x: nextX, animated: true });
      }
    }
  }, [loop, n, itemStep, scrollX, displayData.length]);
  const goToPreviousSlide = (0, import_react26.useCallback)(() => {
    const currentIndex = Math.round(scrollX.value / itemStep);
    const prevIndex = currentIndex <= 0 ? loop ? 0 : n - 1 : currentIndex - 1;
    scrollViewRef.current?.scrollTo({ x: prevIndex * itemStep, animated: true });
  }, [loop, n, itemStep, scrollX]);
  const startTimer = (0, import_react26.useCallback)(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    autoPlayTimer.current = setInterval(() => {
      requestAnimationFrame(() => {
        goToNextSlide();
      });
    }, autoPlayInterval);
  }, [autoPlayInterval, goToNextSlide]);
  const stopTimer = (0, import_react26.useCallback)(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  }, []);
  (0, import_react26.useEffect)(() => {
    if (autoPlay) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [autoPlay, startTimer, stopTimer]);
  const onScroll = (0, import_react26.useCallback)((e) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    if (autoPlay) {
      startTimer();
    }
  }, [autoPlay, startTimer, scrollX]);
  const onMomentumScrollEnd = (0, import_react26.useCallback)((e) => {
    if (!loop || n < 2 || isJumping.current) return;
    const x = Math.round(e.nativeEvent.contentOffset.x);
    const lastCloneX = (displayData.length - 1) * itemStep;
    if (x <= 0) {
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: n * itemStep, animated: false });
      scrollX.value = n * itemStep;
      setTimeout(() => {
        isJumping.current = false;
      }, 50);
    } else if (x >= lastCloneX) {
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
      scrollX.value = itemStep;
      setTimeout(() => {
        isJumping.current = false;
      }, 50);
    }
  }, [loop, n, itemStep, displayData.length, scrollX]);
  return {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    goToNextSlide,
    goToPreviousSlide,
    itemStep,
    n
  };
}

// src/hooks/useOTPInput.ts
var import_react27 = require("react");
function useOTPInput({
  length,
  value,
  onChange,
  onComplete,
  disabled = false
}) {
  const [isFocused, setIsFocused] = (0, import_react27.useState)(false);
  const inputRef = (0, import_react27.useRef)(null);
  const handlePress = (0, import_react27.useCallback)(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);
  const handleChange = (0, import_react27.useCallback)((text) => {
    const numericVal = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(numericVal);
    if (numericVal.length === length && onComplete) {
      onComplete(numericVal);
    }
  }, [length, onChange, onComplete]);
  return {
    inputRef,
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    handlePress,
    handleChange,
    getOtpProps: () => ({
      value,
      onChangeText: handleChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      keyboardType: "number-pad",
      textContentType: "oneTimeCode",
      autoComplete: "one-time-code",
      maxLength: length,
      editable: !disabled
    })
  };
}

// src/hooks/useSegmentedControl.ts
var import_react28 = require("react");
function useSegmentedControl({
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false
}) {
  const [internalValue, setInternalValue] = (0, import_react28.useState)(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const isSelected = (0, import_react28.useCallback)((val) => value === val, [value]);
  const selectValue = (0, import_react28.useCallback)((val) => {
    if (disabled) return;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }, [disabled, isControlled, onChange]);
  return {
    value,
    setSelectedIndex: (index, options) => selectValue(options[index]),
    isSelected,
    getTabProps: (val, index) => ({
      onPress: () => selectValue(val),
      accessibilityRole: "tab",
      accessibilityState: { selected: isSelected(val), disabled }
    })
  };
}

// src/hooks/useTable.ts
var import_react29 = require("react");
function useTable({
  data,
  rowsPerPage: initialRowsPerPage = 10,
  initialPage = 0,
  initialSort = null
}) {
  const [page, setPage] = (0, import_react29.useState)(initialPage);
  const [rowsPerPage, setRowsPerPage] = (0, import_react29.useState)(initialRowsPerPage);
  const [sort, setSort] = (0, import_react29.useState)(initialSort);
  const [selected, setSelected] = (0, import_react29.useState)(/* @__PURE__ */ new Set());
  const processedData = (0, import_react29.useMemo)(() => {
    if (!sort) return data;
    const { key, direction } = sort;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort]);
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = (0, import_react29.useMemo)(() => {
    const start = page * rowsPerPage;
    return processedData.slice(start, start + rowsPerPage);
  }, [processedData, page, rowsPerPage]);
  const handleSort = (0, import_react29.useCallback)((key) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }, []);
  const toggleSelect = (0, import_react29.useCallback)((id2) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id2)) next.delete(id2);
      else next.add(id2);
      return next;
    });
  }, []);
  const toggleSelectAll = (0, import_react29.useCallback)((ids) => {
    setSelected((prev) => {
      if (prev.size === ids.length) return /* @__PURE__ */ new Set();
      return new Set(ids);
    });
  }, []);
  const isSelected = (0, import_react29.useCallback)((id2) => selected.has(id2), [selected]);
  return {
    page,
    rowsPerPage,
    sort,
    selected,
    processedData,
    paginatedData,
    totalPages,
    setPage,
    setRowsPerPage,
    handleSort,
    toggleSelect,
    toggleSelectAll,
    isSelected
  };
}

// src/hooks/useAlert.ts
var import_react30 = require("react");
function useAlert({
  defaultOpen = true,
  onClose
} = {}) {
  const [isOpen, setIsOpen] = (0, import_react30.useState)(defaultOpen);
  const close = (0, import_react30.useCallback)(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  return {
    isOpen,
    close,
    getAlertProps: () => ({
      role: "alert",
      accessibilityRole: "alert"
    }),
    getCloseButtonProps: () => ({
      onPress: close,
      accessibilityLabel: "Close alert",
      accessibilityRole: "button"
    })
  };
}

// src/hooks/useBottomNavigation.ts
var import_react31 = require("react");
function useBottomNavigation({
  value: controlledValue,
  defaultValue,
  onChange
}) {
  const [internalValue, setInternalValue] = (0, import_react31.useState)(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const isSelected = (0, import_react31.useCallback)((val) => value === val, [value]);
  const selectValue = (0, import_react31.useCallback)((val) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }, [isControlled, onChange]);
  return {
    value,
    selectValue,
    isSelected,
    getItemProps: (val) => ({
      onPress: () => selectValue(val),
      accessibilityRole: "tab",
      accessibilityState: { selected: isSelected(val) }
    })
  };
}

// src/hooks/useMenu.ts
var import_react32 = require("react");
function useMenu({
  onClose,
  onOpen
} = {}) {
  const [isOpen, setIsOpen] = (0, import_react32.useState)(false);
  const open = (0, import_react32.useCallback)(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);
  const close = (0, import_react32.useCallback)(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  const toggle = (0, import_react32.useCallback)(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);
  return {
    isOpen,
    open,
    close,
    toggle,
    getTriggerProps: () => ({
      onPress: toggle,
      accessibilityRole: "button",
      accessibilityHasPopup: "menu",
      accessibilityState: { expanded: isOpen }
    }),
    getItemProps: (options = {}) => ({
      onPress: () => {
        if (options.disabled) return;
        options.onClick?.();
        close();
      },
      accessibilityRole: "menuitem",
      accessibilityState: { disabled: options.disabled }
    })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeProvider,
  createTheme,
  dismissAllToasts,
  dismissToast,
  focusRingAnimation,
  heroTransition,
  motionEasing,
  motionPresets,
  showToast,
  timingPreset,
  useAccordion,
  useActiveBrand,
  useAlert,
  useAutocomplete,
  useBottomNavigation,
  useBottomSheet,
  useBrandSwitch,
  useCarousel,
  useCheckbox,
  useComponentTokens,
  useDisclosure,
  useDrawer,
  useField,
  useIconStyle,
  useIsDark,
  useListItem,
  useMemoStyles,
  useMenu,
  useModal,
  useOTPInput,
  usePagination,
  usePressable,
  useRadioGroup,
  useRating,
  useScrollHeader,
  useSegmentedControl,
  useSelect,
  useSlider,
  useStepper,
  useSwitch,
  useTable,
  useTabs,
  useTheme,
  useToast,
  useToggleGroup,
  useTokens
});
/*! Bundled license information:

react-refresh/cjs/react-refresh-runtime.production.min.js:
  (**
   * @license React
   * react-refresh-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-refresh/cjs/react-refresh-runtime.development.js:
  (**
   * @license React
   * react-refresh-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.production.min.js:
  (**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=index.js.map