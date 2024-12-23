import { ButtonHTMLAttributes, MouseEvent, ReactNode, useContext } from "react";
import { FormContext } from "./form.context";

export function FormButton({ children, ...buttonProps }: { children: ReactNode | string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { touchAllFormFields } = useContext(FormContext)

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    touchAllFormFields()
    buttonProps.onClick?.(event)
  }
  
  return <button {...buttonProps} onClick={handleClick} className="bg-yellow-600 p-2 rounded-lg mt-4">{children}</button>
}