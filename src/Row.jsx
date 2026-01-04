import React from "react";
import CreateForm from "./CreateForm";
import ConfirmDelete from "./ConfirmDelete";
// import ImgExpand from "./ImgExpand";
import ImgExpand from "./components/ImagePreview";
// import { Modal, ModalOpen, ModalWindow } from "./compose/Modal";
import { Modal, Open, Window } from "./compose/Modal2";

import PrintPreview from "./PrintPreview";
import { Menus, Toggle, List, Button } from "./compose/Menus";

import { FaRegImage } from "react-icons/fa";

import { formatDate } from "./utils/formatDate";
import Dialog from "./components/Dialog";

import { EllipsisVertical, Printer, SquarePen, Trash } from "lucide-react";

const Row = ({ cabin }) => {
  const {
    id: cabinId,
    created_at,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const popUrl = image.split("/").pop();
  return (
    <>
      <tr
        className={`h-fit border-t-[1.4px] border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-block-hover)]`}
      >
        <td className="sticky top-0 left-0 z-30 m-0 p-0 leading-[1]">
          <Modal>
            <Open id="expand">
              <div className="px-6 py-4 backdrop-blur-sm hover:text-blue-200 cursor-pointer">
                <img
                  className="block w-14 h-18 aspect-[3/2] object-cover rounded-sm max-lg:hidden"
                  src={image}
                  alt={description}
                />
                <FaRegImage className="lg:hidden w-8 h-8" />
              </div>
            </Open>

            <Window id="expand">
              <Dialog>
                <ImgExpand
                  image={image}
                  title={name}
                  description={description}
                />
              </Dialog>
            </Window>
          </Modal>
        </td>
        <td className="px-6 py-4">
          <p>{name}</p>
          <p className="text-nowrap">{formatDate(created_at)}</p>
        </td>
        <td className="px-6 py-4">{maxCapacity}</td>
        <td className="px-6 py-4">{regularPrice}</td>
        <td className="px-6 py-4">{discount}</td>
        <td className="px-6 py-4">
          <Modal>
            <Menus>
              <Toggle id={cabinId}>
                <EllipsisVertical />
              </Toggle>

              <List id={cabinId}>
                {/* ModalOpen 触发器仍然在列表里 */}
                <Open id="pagePrint">
                  <Button>
                    <div className="flex gap-2 items-center">
                      <Printer size={18} strokeWidth={1.5} />
                      <span>Print</span>
                    </div>
                  </Button>
                </Open>

                <Open id="update">
                  <Button>
                    <div className="flex gap-2 items-center">
                      <SquarePen size={18} strokeWidth={1.5} />
                      <span>Edit</span>
                    </div>
                  </Button>
                </Open>

                <Open id="delete">
                  <Button>
                    <div className="flex gap-2 items-center">
                      <Trash size={18} strokeWidth={1.5} />
                      <span>Delete</span>
                    </div>
                  </Button>
                </Open>
              </List>

              {/* ModalWindow 移到了列表外面，不再受列表关闭的影响 */}

              <Window id="pagePrint">
                <PrintPreview data={cabin} />
              </Window>
              <Window id="update">
                <CreateForm cabinToEdit={cabin} />
              </Window>
              <Window id="delete">
                <ConfirmDelete id={cabinId} deleteUrl={popUrl} />
              </Window>
            </Menus>
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default Row;
