import { ValidationError } from "./ValidationError.type";

 
export type Validator = (value: string) => ValidationError | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatorCreator = (...args: any[]) => Validator
