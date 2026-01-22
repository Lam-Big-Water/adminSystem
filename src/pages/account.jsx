import React from "react";

const Account = () => {
  const staticAccountData = {
    name: "Sam Lam",
    newPassword: "",
    confirmPassword: ""
  };

  const [formData, setFormData] = React.useState(staticAccountData);
  const [isDirty, setIsDirty] = React.useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
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
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Error: New password and confirm password do not match.");
      return;
    }
    
    alert("Error: You do not have permission to modify account settings.");
    
    setFormData(staticAccountData);
    setIsDirty(false);
  };

  const handleReset = () => {
    setFormData(staticAccountData);
    setIsDirty(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 font-medium text-foreground">
      <div className="sticky top-0 border-b border-border pb-2 bg-background w-full">
        <h3 className="text-lg">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>

      <div className="max-w-2xl overflow-y-auto w-full h-full scroll-smooth pe-4 pb-12 lg:max-w-xl">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-6 px-1">
            <label
              htmlFor="name"
              className="text-sm leading-none font-medium select-none pb-1"
            >
              Name
            </label>
            <input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="SamLam"
              className="w-full h-9 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
              type="text"
            />
            <p className="text-sm text-muted-foreground">
              This is the name that will be displayed on your profile and in
              emails.
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-6 px-1">
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
              className="w-full h-9 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
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
              className="w-full h-9 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
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