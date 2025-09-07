import React from "react";
import { Modal, ModalOpen, ModalWindow } from "./compose/Modal";
import CreateForm from "./CreateForm";
import { IoMdAdd } from "react-icons/io";

const AddCabin = () => {
  return (
      <div>

        <Modal>
        <ModalOpen opens="add">
          <button className="flex items-center gap-1 bg-[var(--color-block)] text-sm font-bold border-[1.4px] border-[var(--color-border)] rounded-sm text-[var(--text-primary)] py-2 px-4 hover:bg-[var(--color-block-hover)] cursor-pointer max-lg:p-2">
            <IoMdAdd className="text-lg"/>
            <span className="max-lg:hidden ">Add New Data</span>
          </button>
        </ModalOpen>

        <ModalWindow name="add">
          <CreateForm />
        </ModalWindow>
      </Modal>

      </div>
  );
};

export default AddCabin;
