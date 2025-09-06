import React from "react";
import { useDelete } from "./query/cabins/useDelete";
import { HiXMark } from "react-icons/hi2";

const ConfirmDelete = ({ resourceName, onCloseModal, id, deleteUrl, onConfirm }) => {
  const { deleteData, isDeleting } = useDelete();
  function handleDelete() {
    deleteData(
      { id, deleteUrl },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <div>
      
      <h1 className="text-2xl text-[var(--text-primary)] font-medium">
        Delete {resourceName}
      </h1>
      <p className="text-xs text-[var(--text-second)] py-4 w-[85%]">
        Are you sure you want to delete this cabins permanently? This action
        cannot be undone.
      </p>
      <div className="flex justify-end items-center gap-4">
        <button
        tabindex="0"
          onClick={() => onCloseModal?.()}
          className="px-4 py-2 border-[1.4px] border-[var(--color-border)] rounded-sm bg-[var(--color-second)] text-sm text-[var(--color-primary)] cursor-pointer hover:bg-[var(--second-button-hover)]"
        >
          Cancel
        </button>
        <button
          disabled={isDeleting}
          onClick={onConfirm}
          className={`px-4 py-2 border-[1.4px] border-[var(--color-border)] rounded-sm bg-[var(--color-primary)] text-sm text-[var(--color-second)] hover:bg-[var(--primary-button-hover)] ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Delete
        </button>
        
      </div>
    </div>
  );
};

export default ConfirmDelete;

{/* <button
        className="w-6 h-6 cursor-pointer hover:border-2 rounded-sm absolute right-4 top-4"
        onClick={() => onCloseModal?.()}
      >
        <HiXMark className="w-full h-full" />
      </button> */}