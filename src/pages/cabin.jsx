import React from "react";
import Table from "../Table";
import Filter from "@/Filter";
import Caption from "@/components/Caption";
import { Modal, Open, Window } from "../compose/Modal2";
import CreateForm from "../CreateForm";
import { Plus } from "lucide-react";
import CabinsList from "@/components/CabinsList";
const cabin = () => {
  return (
    <div className="py-6 px-4 max-w-7xl w-full mx-auto">
      <Caption
        title="Cabins"
        description="Here's a list of your cabins for the integration!"
      >
        <Modal>
          <Open id="add">
            <button className="flex h-9 items-center gap-1 text-sm font-medium text-primary-foreground bg-primary  py-2 px-3 rounded-md hover:bg-primary/90 transition-colors duration-200">
              <span className="">Create</span>
              <Plus size={18} strokeWidth={2} />
            </button>
          </Open>

          <Window id="add">
            <CreateForm />
          </Window>
        </Modal>
      </Caption>
      <div className="flex justify-between items-center my-4">
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No discount" },
            { value: "with-discount", label: "With discount" },
          ]}
        />
      </div>
      <div className="w-full border-b border-border shadow-sm"></div>

      <CabinsList />
    </div>
  );
};

export default cabin;
