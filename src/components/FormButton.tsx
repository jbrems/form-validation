import { ButtonHTMLAttributes, MouseEvent, ReactNode, useRef } from "react";

export function FormButton({ children, ...buttonProps }: { children: ReactNode | string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!buttonRef.current) return

    const form = buttonRef.current.closest('form')
    const touchFieldsEvent = new CustomEvent('touch-fields')
    form?.dispatchEvent(touchFieldsEvent)

    buttonProps.onClick?.(event)
  }
  
  return <button ref={buttonRef} {...buttonProps} onClick={handleClick} className="bg-yellow-600 p-2 rounded-lg mt-4">{children}</button>
}