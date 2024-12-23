import { FormField } from "./FormField.type";
import { ValidationError } from "./ValidationError.type";

export type FormValidator = (formFields: Record<string, FormField>) => { error: ValidationError, formFields: Record<string, boolean> } 