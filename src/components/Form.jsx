import { useForm } from "react-hook-form";

import FormField from "../FormField";
import FocusLock from "react-focus-lock";
import { X } from "lucide-react";

const Form = ({ onCloseModal }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: "",
      full_name: "",
      phone: "",
      role: "authenticated",
      avatar_url: ""
    },
  });

  const { errors } = formState;
  const isWorking = false; // 暂时设置为 false，因为需要添加实际的创建逻辑

  function onSubmit(data) {
    console.log("User data to create:", data);
    
    // 显示权限提示
    alert("Error: You do not have permission to create new users.");
    
    // 重置表单
    reset();
    onCloseModal?.();
  }

  return (
    <FocusLock>
      <div className="overflow-y-auto max-h-150 fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg flex flex-col gap-4 text-slate-950 dark:text-slate-200 bg-stone-50 dark:bg-stone-950 font-medium rounded-2xl shadow-lg max-sm:w-full">
        <div className="w-full sticky top-0 flex flex-col gap-2 text-start px-6 pt-6 bg-stone-50 dark:bg-stone-950">
          <h2 className="text-lg leading-none font-semibold">
            Add New User
          </h2>
          <p className="text-sm text-zinc-400">
            Create new user here. Click save when you're done.
          </p>
          <button
            onClick={() => onCloseModal?.()}
            className="flex items-center justify-center cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 p-1 rounded-md active:outline-2 active:outline-zinc-400"
          >
            <X size={16} />
          </button>
        </div>

        <form className="px-6 pb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-4  items-end">
              <FormField
                label="Full Name"
                id="full_name"
                register={register}
                errors={errors}
                validationRules={{ required: "Full name is required!" }}
                placeholder="Sam Lam"
              />

              <FormField
                label="Email"
                id="email"
                type="email"
                register={register}
                errors={errors}
                validationRules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                placeholder="example@email.com"
              />
            </div>

            <div className="grid gap-4 items-end">
              <FormField
                label="Phone"
                id="phone"
                type="tel"
                register={register}
                errors={errors}
                validationRules={{
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Invalid phone number",
                  },
                }}
                placeholder="+1234567890"
              />

              <div>
                <label 
                  htmlFor="role"
                  className="text-sm leading-none select-none"
                >
                  Role
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="w-full h-9 min-w-0 px-3 py-1 text-base shadow-xs border border-zinc-400 rounded-md focus:outline-none focus-visible:ring-[3px] focus-visible:ring-zinc-400"
                >
                  <option value="authenticated">Authenticated</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <FormField
              label="Avatar URL"
              id="avatar_url"
              register={register}
              errors={errors}
              placeholder="https://example.com/avatar.jpg"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => onCloseModal?.()}
                type="button"
                className="text-sm cursor-pointer text-slate-950 dark:text-slate-200 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-900 rounded-md py-2 px-4 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                disabled={isWorking}
                type="submit"
                className="text-sm cursor-pointer dark:text-slate-950 text-slate-200 dark:bg-stone-50 bg-stone-950 border border-stone-200 dark:border-stone-900 rounded-md py-2 px-4 transition-colors duration-200"
              >
                Create User
              </button>
            </div>
          </div>
        </form>
      </div>
    </FocusLock>
  );
};

export default Form;