'use client'

import { FormField } from "@/lib/FormField.type";
import { FormValidator } from "@/lib/FormValidator.type";
import { ReactNode, useEffect, useRef, useState } from "react";

export function Form({ children, validators = [] }: { children: ReactNode, validators?: FormValidator[] }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [formFields, setFormFields] = useState<Record<string, FormField>>({})

  useEffect(() => {
    if (!formRef.current) return

    const event = new CustomEvent('update-fields', { detail: formFields })
    formRef.current.dispatchEvent(event)
  }, [formFields])

  useEffect(() => {
    const newFormFields = JSON.parse(JSON.stringify(formFields))
    validators.forEach((validator) => {
      const errors = validator(formFields)
      if (errors !== null) {
        Object.entries(errors).forEach(([fieldName, error]) => {
          if (!newFormFields[fieldName].errors.includes(error)) newFormFields[fieldName].errors.push(error)
        })
      }
    })
    if (JSON.stringify(newFormFields) !== JSON.stringify(formFields)) setFormFields(newFormFields)
  }, [formFields, validators])

  useEffect(() => {
    const currentRef = formRef.current

    if (!currentRef) return

    const updateForm = (event: Event) => {
      if (!(event instanceof CustomEvent)) return
      setFormFields((formFields) => ({ ...formFields, [event.detail.name]: { ...event.detail }}))
    }

    currentRef.addEventListener('update-form', updateForm)

    return () => { currentRef?.removeEventListener('update-form', updateForm) }
  }, [])

  return <div className="grid gap-10 sm:grid-cols-2">
    <form ref={formRef}>
      { children }
    </form>
    <pre>
      {JSON.stringify(formFields, null, 2)}
    </pre>
  </div>
}
