'use client'

import { Form } from "./Form";
import Input from "./Input";
import { FormButton } from "./FormButton";
import { email, minLength, required } from "@/lib/validators";
import { FormValidator } from "@/lib/FormValidator.type";

export default function RegistrationForm() {
  const passwordValidator: FormValidator = (formFields) => {
    const passwordsProvided = !!formFields.password?.value && !!formFields['confirm-password']?.value
    if (!passwordsProvided) return null
    const passwordFieldsTouched = formFields.password.touched && formFields['confirm-password'].touched
    if (!passwordFieldsTouched) return null
    const valuesMatch = formFields.password.value === formFields['confirm-password'].value
    if (valuesMatch) return null
    return { password: 'PASSWORD_MISMATCH', 'confirm-password': 'PASSWORD_MISMATCH' }
  }

  return <Form validators={[passwordValidator]}>
    <fieldset className="flex flex-col gap-4">
      <Input label="Email address" name="email" type="email" validators={[required(), email()]} />
      <Input label="Password" name="password" type="password" validators={[required(), minLength(10)]} />
      <Input label="Confirm password" name="confirm-password" type="password" validators={[required()]} />
      <FormButton type="button">Register</FormButton>
    </fieldset>
  </Form>
}