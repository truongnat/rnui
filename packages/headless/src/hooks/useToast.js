"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = showToast;
exports.dismissToast = dismissToast;
exports.dismissAllToasts = dismissAllToasts;
exports.useToast = useToast;
const react_1 = require("react");
const store = {
    queue: [],
    listeners: new Set(),
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
// ─── Internal queue operations ────────────────────────────────────
let _idCounter = 0;
function showToast(options) {
    const id = `toast-${++_idCounter}`;
    const item = {
        id,
        message: options.message,
        variant: options.variant ?? "default",
        duration: options.duration ?? 3500,
        persistent: options.persistent ?? false,
        action: options.action,
        icon: options.icon,
    };
    // Max 3 toasts visible at once — drop oldest
    store.queue = [...store.queue.slice(-2), item];
    notify();
    return id;
}
function dismissToast(id) {
    store.queue = store.queue.filter((t) => t.id !== id);
    notify();
}
function dismissAllToasts() {
    store.queue = [];
    notify();
}
function useToast() {
    const toasts = (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
    const show = (0, react_1.useCallback)((options) => showToast(options), []);
    const dismiss = (0, react_1.useCallback)((id) => dismissToast(id), []);
    const dismissAll = (0, react_1.useCallback)(() => dismissAllToasts(), []);
    const success = (0, react_1.useCallback)((message, opts) => showToast({ ...opts, message, variant: "success" }), []);
    const error = (0, react_1.useCallback)((message, opts) => showToast({ ...opts, message, variant: "error" }), []);
    const warning = (0, react_1.useCallback)((message, opts) => showToast({ ...opts, message, variant: "warning" }), []);
    const info = (0, react_1.useCallback)((message, opts) => showToast({ ...opts, message, variant: "info" }), []);
    return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}
//# sourceMappingURL=useToast.js.map