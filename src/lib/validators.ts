import { ValidationError } from "./ValidationError.type";
import { Validator, ValidatorCreator } from "./Validator.type";

export function runValidators(validators: Validator[] = [], value: string): ValidationError[] {
  return validators.map(v => v(value)).filter(e => e != null).flat()
}

export const required: ValidatorCreator = (errorCode: string = 'REQUIRED') => (value) => {
  if (value) return null
  return errorCode
}

export const regex: ValidatorCreator = (regex: RegExp, errorCode: string = 'REGEX_MISMATCH') => (value) => {
  if (!value || regex.test(value)) return null
  return errorCode
}

export const email: ValidatorCreator = () => regex(/^.{2,}@.{2,}\..{2,}$/, 'INVALID_EMAIL')

export const minLength: ValidatorCreator = (minLength: number, errorCode: string = 'TOO_SHORT') => (value) => {
  if (!value || value.length >= minLength) return null
  return errorCode
}
