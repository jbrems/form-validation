import { ValidationError } from "./ValidationError.type"

export type FormField = {
  name: string
  value: string
  errors: ValidationError[]
  touched: boolean
}