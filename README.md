# Form validation POC 
A quick proof of concept project to figure out what is needed to build your own form validation in React using Next.js.

## Requirements
* The form at all times knows the status and values of all its form fields
* The form fields are only responsible for their own value and validations
* Validations requiring multiple form fields are handled by the form
* A form field's validity is updated on every change
* Form level validity is updated on every change of every form field
* Validation errors are only shown to the user on blur of the field or on submit of the form
* Validation errors are removed when no longer applicable on change
* Form level validation errors are removed when no longer applicable on every change of every form field
* Validation rules can be reused by multiple form fields
* Validation rules can be combined
* Validation rules can be customized

## Requirements not implemented
The following requirements were solved but removed or not implemented as they added more complexity than benefits to the code base which would needlessly make this POC harder to understand or explain:

* Form level validation errors are removed when no longer applicable on every change of every form field
  - Form level validation errors that are displayed for multiple form fields are only removed for the form field that solves the error
* Validation rules can be customized
  - Validation error labels cannot be customized