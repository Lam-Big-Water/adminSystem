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
      className={`text-sm leading-none select-none col-span-2 max-sm:w-full ${
          isError ? "text-red-500" : ""
        }`}
      >
      {label}

      </label>

      {type === "textarea" ? (
        <textarea 
          id={id}
          autoComplete={autoComplete}
          {...register(id, validationRules)}
          defaultValue={defaultValue}
          className={`w-full min-h-26 min-w-0 px-3 py-1 text-base shadow-xs border rounded-md col-span-4  placeholder:text-zinc-400 max-sm:w-full ${
            isError ? "border-red-500 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-red-300" : "border-zinc-400 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-zinc-400"
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
          className={`w-full h-9 min-w-0 px-3 py-1 text-base shadow-xs border rounded-md col-span-4  placeholder:text-zinc-400 max-sm:w-full ${
            isError ? "border-red-500 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-red-300" : "border-zinc-400 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-zinc-400"
          }`}
          {...props}
        />
        
      )}
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1 col-start-3 col-end-6 max-sm:col-span-1">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default FormField