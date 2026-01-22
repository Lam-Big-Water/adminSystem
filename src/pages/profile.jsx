import React from "react";

const Profile = () => {
  const staticUserData = {
    username: "SamLam",
    email: "codesanboxboard01@gmail.com",
    bio: "I made this site. Full-stack developer with a passion for creating beautiful user interfaces.",
    urls: ["https://shadcn.com", "http://twitter.com/shadcn"],
  };

  // 使用 state 来管理表单数据
  const [formData, setFormData] = React.useState(staticUserData);
  const [isDirty, setIsDirty] = React.useState(false);

  // 处理输入变化
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "urls0" || id === "urls1") {
      const newUrls = [...formData.urls];
      const index = id === "urls0" ? 0 : 1;
      newUrls[index] = value;
      setFormData((prev) => ({ ...prev, urls: newUrls }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }

    if (!isDirty) setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 显示权限错误提示
    alert("Error: You do not have permission to modify user data.");

    // 恢复原始数据
    setFormData(staticUserData);
    setIsDirty(false);
  };

  // 重置表单到原始数据
  const handleReset = () => {
    setFormData(staticUserData);
    setIsDirty(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 font-medium text-foreground w-full">
      <div className="sticky top-0 border-b border-border pb-2 bg-background w-full">
        <h3 className="text-lg">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <form
        className="w-full flex flex-col gap-4 overflow-y-auto scroll-smooth pe-4 pb-12 lg:max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 mb-6 px-1">
          <label
            htmlFor="username"
            className="text-sm leading-none font-medium select-none pb-1"
          >
            Username
          </label>
          <input
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full h-9 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
            type="text"
          />
          <p className="text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6 px-1">
          <label
            htmlFor="email"
            className="text-sm leading-none font-medium select-none pb-1"
          >
            Email
          </label>
          <input
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-9 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
            type="email"
          />
          <p className="text-sm text-muted-foreground">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6 px-1">
          <label
            htmlFor="bio"
            className="text-sm leading-none font-medium select-none pb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="resize-none w-full min-h-30 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
          />
          <p className="text-sm text-muted-foreground">
            You can @mention other users and organizations to link to them.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6 px-1">
          <label
            htmlFor="urls"
            className="text-sm leading-none font-medium select-none pb-1"
          >
            URLs
          </label>
          <p className="text-sm text-muted-foreground">
            Add links to your website, blog, or social media profiles.
          </p>
          {formData.urls.map((url, index) => (
            <input
              key={index}
              id={`urls${index}`}
              value={url}
              onChange={handleInputChange}
              className="w-full h-9 min-w-0 px-3 py-1 text-sm shadow-xs border rounded-md col-span-4 placeholder:text-muted-foreground placeholder:text-sm max-sm:w-full border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
              type="text"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex justify-center items-center gap-1 text-sm font-medium text-stone-200 py-2 px-2.5 dark:text-stone-950 bg-stone-950 dark:bg-stone-50 rounded-md hover:bg-neutral-800/70 dark:hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            <span>Update profile</span>
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
  );
};

export default Profile;
