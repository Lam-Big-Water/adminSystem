import React from "react";
import { Modal, Open, Window } from "../compose/Modal2";
import CreateForm from "../CreateForm";
import { Plus } from "lucide-react";
const TableCaption = () => {
  return (
    <div className="py-4 flex justify-between font-medium">
      <div className="flex flex-col gap-1">
        <h1
          className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-200
"
        >
          Cabins
        </h1>
        <span className="text-gray-500">
          Here's a list of your cabins for this month!
        </span>
      </div>
      <div className="self-end">
        <Modal>
          <Open id="add">
            <button
              className="flex items-center gap-1 text-sm font-medium text-stone-200 dark:text-stone-950 bg-stone-950 dark:bg-stone-50  py-2 px-3 rounded-md hover:bg-neutral-800/70
dark:hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            >
              <span className="">Create</span>
              <Plus size={18} strokeWidth={2} />
            </button>
          </Open>

          <Window id="add">
            <CreateForm />
          </Window>
        </Modal>
      </div>
    </div>
  );
};

export default TableCaption;
