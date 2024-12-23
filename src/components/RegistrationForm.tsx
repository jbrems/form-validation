'use client'

import { Form } from "./form/Form";
import Input from "./form/Input";
import { FormButton } from "./form/FormButton";
import { email, minLength, required } from "@/lib/validators";
import { FormValidator } from "@/lib/FormValidator.type";

export default function RegistrationForm() {
  const passwordValidator: FormValidator = (formFields) => {
    const passwordsProvided = !!formFields.password?.value && !!formFields['confirm-password']?.value
    const passwordFieldsTouched = formFields.password?.touched && formFields['confirm-password']?.touched
    const valuesMatch = formFields.password?.value === formFields['confirm-password']?.value
    if (!passwordsProvided || !passwordFieldsTouched || valuesMatch) return { error: 'PASSWORD_MISMATCH', formFields: { password: false, 'confirm-password': false }}
    return { error: 'PASSWORD_MISMATCH', formFields: { password: true, 'confirm-password': true }}
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