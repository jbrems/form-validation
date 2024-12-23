'use client'

import { FormValidator } from "@/lib/FormValidator.type";
import { ReactNode, useContext, useEffect } from "react";
import { FormProvider } from "./Form.provider";
import { FormContext } from "./form.context";

export function Form({ children, validators = [] }: { children: ReactNode, validators?: FormValidator[] }) {
  return <div className="grid gap-10 sm:grid-cols-2">
    <FormProvider>
      <ActualForm validators={validators}>{children}</ActualForm>
    </FormProvider>
  </div>
}

function ActualForm({ children, validators = [] }: { children: ReactNode, validators?: FormValidator[] }) {
  const { formFields, formErrors, updateFormErrors } = useContext(FormContext)

  useEffect(() => {
    validators.forEach((validator) => {
      const errors = validator(formFields)
      updateFormErrors(errors)
    })
  }, [formFields])

  return <>
    <form>
      { children }
    </form>
    <aside>
      <pre>
        {JSON.stringify(formErrors, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(formFields, null, 2)}
      </pre>
    </aside>
  </>
}
