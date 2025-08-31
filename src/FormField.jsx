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
      className={`mb-2 block text-sm font-medium ${isError ? "text-red-400" : "text-white"}`}
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
          className={`w-full bg-[var(--hoverBackground)] rounded-sm border-[1.4px] border-[var(--border)] focus:outline-1 focus:outline-gray-300 p-2 text-white ${
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
          className={`relative w-full bg-[var(--hoverBackground)] rounded-sm border-[1.4px] border-[var(--border)] focus:outline-1 focus:outline-gray-300 p-2 text-white ${
            props.readOnly ? "bg-gray-700" : ""
          }`}
          {...props}
        />
      )}
    </div>
  )
}

export default FormField