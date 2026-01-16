import React from "react";
import { EyeOff, Eye } from "lucide-react";

const FormFieldPassword = ({
  id,
  label,
  autoComplete = "off",
  errors,
  register,
  className = "",
  defaultValue,
  validationRules = {},
  ...props
}) => {
  const [eye, setEye] = React.useState(false);

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

      <div className="relative">
        <input
        id={id}
        type={eye ? "text" : "password"}
        autoComplete={autoComplete}
        {...register(id, validationRules)}
        defaultValue={defaultValue}
        className={`w-full h-9 min-w-0 px-3 py-1 text-base shadow-xs border rounded-md col-span-4  placeholder:text-muted-foreground max-sm:w-full ${
          isError
            ? "border-destructive focus:outline-none focus-visible:ring-[3px] focus-visible:ring-red-300"
            : "border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
        }`}
        {...props}
      />

      <button
        onClick={() => setEye(!eye)}
        type="button"
        className="flex justify-center items-center text-muted-foreground absolute end-2 top-1/2 w-6 h-6 -translate-y-1/2 cursor-pointer hover:text-black dark:hover:text-amber-50"
      >
        {eye ? <Eye size="20px" /> : <EyeOff size="20px" />}
      </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-xs mt-1 col-start-3 col-end-6 max-sm:col-span-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormFieldPassword;
