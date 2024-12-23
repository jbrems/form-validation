import { ReactNode, useCallback, useState } from "react"
import { FormContext, FormContextType } from "./form.context"
import { FormField } from "@/lib/FormField.type"
import { ValidationError } from "@/lib/ValidationError.type"
import { FormValidator } from "@/lib/FormValidator.type"

export function FormProvider({ children }: { children: ReactNode }) {
  const [formFields, setFormFields] = useState<Record<string, FormField>>({})
  const [formErrors, setFormErrors] = useState<Record<string, ValidationError[]>>({})
  
  const updateFormField = useCallback((formField: FormField) => {
    setFormFields(formFields => ({ ...formFields, [formField.name]: formField }))
  }, [])

  const updateFormErrors = useCallback(({ error, formFields }: ReturnType<FormValidator>) => {
    const newFormErrors: Record<string, ValidationError[]> = JSON.parse(JSON.stringify(formErrors))
    for (const fieldName in formFields) {
      if (!newFormErrors[fieldName]) newFormErrors[fieldName] = []
      if (formFields[fieldName] && !newFormErrors[fieldName].includes(error)) newFormErrors[fieldName].push(error)
      if (!formFields[fieldName] && newFormErrors[fieldName].includes(error)) newFormErrors[fieldName] = newFormErrors[fieldName].filter(e => e !== error)
    }
    setFormErrors(newFormErrors)
  }, [formErrors])

  const touchAllFormFields = useCallback(() => {
    const touchedFormFields = JSON.parse(JSON.stringify(formFields))
    for (const fieldName in formFields) {
      touchedFormFields[fieldName].touched = true
    }
    setFormFields(touchedFormFields)
  }, [formFields])

  const value: FormContextType = {
    formFields,
    formErrors,
    updateFormField,
    updateFormErrors,
    touchAllFormFields,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}