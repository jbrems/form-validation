import { FormField } from "./FormField.type";
import { ValidationError } from "./ValidationError.type";

export type FormValidator = (formFields: Record<string, FormField>) => null | Record<string, ValidationError> 