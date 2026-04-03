import React from "react";

export type FormGroupVariant = "standard" | "grouped";

export const FormGroupContext = React.createContext<FormGroupVariant>("standard");

export function useFormGroupVariant(): FormGroupVariant {
  return React.useContext(FormGroupContext);
}
