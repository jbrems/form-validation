import { ValidationError } from "@/lib/ValidationError.type";

export function FieldErrors({ name, errors }: { name: string, errors: ValidationError[]}) {
  return <ul>
    {errors.map(e => <li key={e.errorCode}>{e.errorMessage.replace('{name}', name)}</li>)}
  </ul>
}