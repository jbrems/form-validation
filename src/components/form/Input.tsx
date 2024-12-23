'use client'

import { lbl } from "@/lib/labels";
import { ValidationError } from "@/lib/ValidationError.type";
import { Validator } from "@/lib/Validator.type";
import { runValidators } from "@/lib/validators";
import { ChangeEvent, FocusEvent, InputHTMLAttributes, useContext, useEffect, useState } from "react";
import { FormContext } from "./form.context";

export default function Input({ name, label, validators = [], ...inputProps }: { name: string, label: string, validators?: Validator[] } & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState<string>('')
  const [touched, setTouched] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const { formFields, formErrors, updateFormField } = useContext(FormContext)
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)
    inputProps.onChange?.(event)
  }
  
  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setTouched(true)
    inputProps.onBlur?.(event)
  }
  
  useEffect(() => {
    updateFormField({ name, value, errors, touched })
  }, [name, value, errors, touched])

  useEffect(() => {
    const newErrors = runValidators(validators, value)
    setErrors(newErrors)
  }, [validators, value])

  useEffect(() => {
    const formField = formFields[name]
    if (!formField) return
    if (formField.value !== value) setValue(formField.value)
    // if (JSON.stringify(formField.errors) !== JSON.stringify(errors)) setErrors(formField.errors)
    if (formField.touched !== touched) setTouched(formField.touched)
  }, [formFields])

  return <label>
      {label}:
      <input 
        name={name}
        className="w-full bg-neutral-700 text-neutral-200 px-2 py-1 rounded border border-neutral-600 focus:border-neutral-600"
        autoComplete="one-time-code"
        {...inputProps} 
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && !!errors?.length && <p className="text-sm text-red-400 px-2 py-1">(!) {lbl(`validation.error.${errors[0].toLocaleLowerCase()}`, { fieldName: label })}</p>}
      {touched && !errors?.length && !!formErrors[name]?.length && <p className="text-sm text-red-400 px-2 py-1">(!) {lbl(`validation.error.${formErrors[name][0].toLocaleLowerCase()}`, { fieldName: label })}</p>}
      {(!touched || (!errors?.length && !formErrors[name?.length])) && <p className="text-sm py-1">&nbsp;</p>}
    </label>
}