export type ToastVariant = "default" | "success" | "warning" | "error" | "info";
export type ToastPosition = "top" | "bottom";
export interface ToastItem {
    id: string;
    message: string;
    variant: ToastVariant;
    duration: number;
    /** If true, user must dismiss manually */
    persistent: boolean;
    /** Optional action button */
    action?: {
        label: string;
        onPress: () => void;
    };
}
export interface ShowToastOptions {
    message: string;
    variant?: ToastVariant;
    /** Duration in ms before auto-dismiss. Default 3500. */
    duration?: number;
    persistent?: boolean;
    action?: ToastItem["action"];
}
export declare function showToast(options: ShowToastOptions): string;
export declare function dismissToast(id: string): void;
export declare function dismissAllToasts(): void;
export interface UseToastReturn {
    /** Current visible toasts */
    toasts: ToastItem[];
    /** Show a new toast, returns its id */
    show: (options: ShowToastOptions) => string;
    /** Dismiss a toast by id */
    dismiss: (id: string) => void;
    /** Dismiss all toasts */
    dismissAll: () => void;
    /** Shorthand helpers */
    success: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
    error: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
    warning: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
    info: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
}
export declare function useToast(): UseToastReturn;
//# sourceMappingURL=useToast.d.ts.map