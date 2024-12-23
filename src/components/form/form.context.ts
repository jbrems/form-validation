import { FormField } from "@/lib/FormField.type";
import { FormValidator } from "@/lib/FormValidator.type";
import { ValidationError } from "@/lib/ValidationError.type";
import { createContext } from "react";

export type FormContextType = {
  formFields: Record<string, FormField>
  formErrors: Record<string, ValidationError[]>
  updateFormField: (formField: FormField) => void
  updateFormErrors: ({ error, formFields }: ReturnType<FormValidator>) => void
  touchAllFormFields: () => void
}

export const FormContext = createContext<FormContextType>({
  formFields: {},
  formErrors: {},
  updateFormField: () => {},
  updateFormErrors: () => {}, 
  touchAllFormFields: () => {},
 })