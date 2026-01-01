import React from "react";
import { Modal, Open, Window } from "./compose/Modal2";
import CreateForm from "./CreateForm";
import Dialog from "./components/Dialog";
import { IoMdAdd } from "react-icons/io";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Open opensWindowName="add">
          <button className="flex items-center gap-1 bg-[var(--color-block)] text-sm font-bold border-[1.4px] border-[var(--color-border)] rounded-sm text-[var(--text-primary)] py-2 px-4 hover:bg-[var(--color-block-hover)] cursor-pointer max-lg:p-2">
            <IoMdAdd className="text-lg" />
            <span className="max-lg:hidden ">Add New Data</span>
          </button>
        </Open>

        <Window name="add">
          <CreateForm />
        </Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
