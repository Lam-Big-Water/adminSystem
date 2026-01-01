const ImagePreview = ({ image, title, description }) => {
  const handleCopyUrl = async () => {
    try {
      const fullUrl = image.startsWith("http")
        ? image
        : `${window.location.origin}${image}`;
      await navigator.clipboard.writeText(fullUrl);
      alert("Image URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
}
    return (
      <div className="max-w-md font-medium border bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-900 rounded-2xl overflow-hidden shadow-lg">
        <div>
          <img src={image} alt="" />
        </div>
        <div className="p-6">
          <h2 className="text-slate-950 dark:text-slate-200 text-lg font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={handleCopyUrl}
            className="text-sm cursor-pointer dark:text-slate-950 text-slate-200
 dark:bg-stone-50 bg-stone-950 
 border border-stone-200 dark:border-stone-900
 dark:hover:bg-gray-200 hover:bg-neutral-800/70
 rounded-md py-2 px-4 transition-colors duration-200 max-sm:w-full"
          >
            Get URL
          </button>
        </div>
      </div>
    );
  };

export default ImagePreview;