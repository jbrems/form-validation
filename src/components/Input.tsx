'use client'

import { lbl } from "@/lib/labels";
import { ValidationError } from "@/lib/ValidationError.type";
import { Validator } from "@/lib/Validator.type";
import { runValidators } from "@/lib/validators";
import { ChangeEvent, FocusEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

export default function Input({ name, label, validators = [], ...inputProps }: { name: string, label: string, validators?: Validator[] } & InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')
  const [touched, setTouched] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)
    inputProps.onChange?.(event)
  }
  
  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setTouched(true)
    inputProps.onBlur?.(event)
  }

  const updateForm = useCallback(() => {
    if (!inputRef.current) return
    const event = new CustomEvent('update-form', { detail: { name, value, errors, touched } })
    const formElement = inputRef.current.closest('form')
    setTimeout(() => formElement?.dispatchEvent(event), 0)
  }, [name, value, errors, touched])
  
  useEffect(() => {
    updateForm()
  }, [name, value, errors, touched, updateForm])

  useEffect(() => {
    const errors = runValidators(validators, value)
    setErrors(errors)
  }, [value, validators])

  useEffect(() => {
    const currentRef = inputRef.current

    if (!currentRef) return

    const form = currentRef.closest('form')

    function handleEvent() { setTouched(true) }

    form?.addEventListener('touch-fields', handleEvent)

    return () => { form?.removeEventListener('touch-fields', handleEvent)}
  }, [setTouched])

  useEffect(() => {
    const currentRef = inputRef.current
    if (!currentRef) return

    function handleUpdateFields(event: Event) {
      if (!(event instanceof CustomEvent)) return
      const fields = event.detail
      if (fields[name]) {
        setValue(fields[name].value)
        setErrors(fields[name].errors)
      }
    }

    const form = currentRef.closest('form')

    form?.addEventListener('update-fields', handleUpdateFields)

    return () => { form?.removeEventListener('update-fields', handleUpdateFields) }
  }, [name])
  
  return <label>
      {label}:
      <input 
        name={name}
        ref={inputRef}
        className="w-full bg-neutral-700 text-neutral-200 px-2 py-1 rounded border border-neutral-600 focus:border-neutral-600"
        autoComplete="one-time-code"
        {...inputProps} 
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && !!errors?.length && <p className="text-sm text-red-400 px-2 py-1">{lbl(`validation.error.${errors[0].toLocaleLowerCase()}`, { fieldName: label })}</p>}
    </label>
}