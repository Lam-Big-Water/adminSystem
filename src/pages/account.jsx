import React from "react";

const Account = () => {
  // 静态数据 - 作为初始值
  const staticAccountData = {
    name: "Sam Lam",
    newPassword: "",
    confirmPassword: ""
  };

  // 使用 state 来管理表单数据
  const [formData, setFormData] = React.useState(staticAccountData);
  const [isDirty, setIsDirty] = React.useState(false);

  // 处理输入变化
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    // 因为 id 包含连字符，需要特殊处理
    if (id === "new-password") {
      setFormData(prev => ({ ...prev, newPassword: value }));
    } else if (id === "confirm-password") {
      setFormData(prev => ({ ...prev, confirmPassword: value }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    
    if (!isDirty) setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 检查密码是否匹配
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Error: New password and confirm password do not match.");
      return;
    }
    
    // 显示权限错误提示
    alert("Error: You do not have permission to modify account settings.");
    
    // 恢复原始数据
    setFormData(staticAccountData);
    setIsDirty(false);
  };

  // 重置表单到原始数据
  const handleReset = () => {
    setFormData(staticAccountData);
    setIsDirty(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 font-medium text-foreground">
      <div className="border-b border-border pb-2">
        <h3 className="text-lg">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>

      <div className="max-w-2xl">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm leading-none font-medium select-none"
            >
              Name
            </label>
            <input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="SamLam"
              className="h-9 w-full min-w-0 placeholder:text-zinc-400 rounded-md border border-border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]"
              type="text"
            />
            <p className="text-sm text-muted-foreground">
              This is the name that will be displayed on your profile and in
              emails.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="new-password"
              className="text-sm leading-none font-medium select-none"
            >
              New Password
            </label>
            <input
              id="new-password"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="h-9 w-full min-w-0 placeholder:text-zinc-400 rounded-md border border-border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]"
              type="password"
            />
            <label
              htmlFor="confirm-password"
              className="text-sm leading-none font-medium select-none"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              className="h-9 w-full min-w-0 placeholder:text-zinc-400 rounded-md border border-border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]"
              type="password"
            />
            <p className="text-sm text-muted-foreground">
              You can manage verified email addresses in your email settings.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex justify-center items-center gap-1 text-sm font-medium text-stone-200 py-2 px-2.5 dark:text-stone-950 bg-stone-950 dark:bg-stone-50 rounded-md hover:bg-neutral-800/70 dark:hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            >
              <span>Update account</span>
            </button>
            
            {isDirty && (
              <button
                type="button"
                onClick={handleReset}
                className="flex justify-center items-center gap-1 text-sm font-medium py-2 px-2.5 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                <span>Reset changes</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;