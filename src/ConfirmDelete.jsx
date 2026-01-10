import FocusLock from "react-focus-lock";
const ConfirmDelete = ({ resourceName, onConfirm, disabled, onCloseModal }) => {

  return (
    <div
      className="w-md h-auto font-semibold bg-stone-50 dark:bg-stone-950 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 p-6 border border-zinc-400 rounded-xl"
    >
      <FocusLock>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col text-start">
            <h2 className="text-lg pb-2 text-slate-950 dark:text-slate-200">Delete this item: {resourceName} ?</h2>
            <p className="text-sm text-gray-500">
              You are about to delete a task with the ID <span className="underline text-base font-black text-gray-700 dark:text-stone-50">{resourceName}</span>
            </p>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              disabled={disabled}
              onClick={onCloseModal}
              className="text-slate-950 dark:text-slate-200 bg-stone-50 dark:bg-stone-950 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800/70 border border-stone-200 dark:border-stone-900
 rounded-md py-2 px-4 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              disabled={disabled}
              onClick={onConfirm}
              className="text-sm text-stone-50 bg-red-600 cursor-pointer hover:bg-red-500 border border-stone-200 dark:border-stone-900
 rounded-md py-2 px-4 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </FocusLock>
    </div>
  );
};

export default ConfirmDelete;

