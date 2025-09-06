import React from 'react'

const FormField = ({
  id,
  label,
  type = 'text',
  autoComplete = "off",
  errors,
  register,
  className = "",
  defaultValue,
  validationRules = {},
  ...props
}) => {

  const errorMessage = errors?.[id]?.message;
  const isError = !!errorMessage;

  return (
    <div className={className}>
      <label 
      htmlFor={id}
      className={`mb-2 block text-base font-normal ${isError ? "text-red-400" : "text-[var(--color-primary)]"}`}
      >
      {label}
      {isError && (
        <span className='text-[0.75rem]'>{` - ${errorMessage}`}</span>
      )}
      </label>

      {type === "textarea" ? (
        <textarea 
          id={id}
          autoComplete={autoComplete}
          {...register(id, validationRules)}
          defaultValue={defaultValue}
          className={`w-full min-h-26 bg-[var(--filed-bg)] rounded-sm border-[1.8px] border-[var(--color-border)] p-2 text-[var(--color-primary)] ${
            props.readOnly ? "bg-gray-700" : ""
          }`}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          {...register(id, validationRules)}
          defaultValue={defaultValue}
          className={`relative w-full bg-[var(--filed-bg)] rounded-sm border-[1.8px] border-[var(--color-border)] p-2 text-[var(--color-primary)] ${
            props.readOnly ? "bg-gray-700" : ""
          }`}
          {...props}
        />
      )}
    </div>
  )
}

export default FormField