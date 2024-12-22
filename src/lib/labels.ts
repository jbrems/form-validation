const LABELS: Record<string, string> = {
  "validation.error.required": "{fieldName} is required.",
  "validation.error.regex": "{fieldName} has an invalid format.",
  "validation.error.invalid_email": "{fieldName} has to be a valid email address.",
  "validation.error.too_short": "{fieldName} has to contain at least {minLength} characters.",
  "validation.error.password_mismatch": "The provided passwords do not match.",
}

export function lbl(labelKey: string, placeholderValues: Record<string, string> = {}): string {
  if (!Object.keys(LABELS).includes(labelKey)) return labelKey
  
  const labelValue = LABELS[labelKey]
  return Object.entries(placeholderValues).reduce((label, [key, value]) => {
    return label.replaceAll(`{${key}}`, value)
  }, labelValue)
}