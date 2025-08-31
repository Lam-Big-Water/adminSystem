import React from "react";
import CreateForm from "./CreateForm";
import ConfirmDelete from "./ConfirmDelete";
import ImgExpand from "./ImgExpand";
import { Modal, ModalOpen, ModalWindow } from "./compose/Modal";
import PrintPreview from "./PrintPreview";
import { Menus, Toggle, List, Button } from "./compose/Menus";


import { FaRegImage } from "react-icons/fa";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatDate } from "./utils/formatDate";

const Row = ({ cabin, i }) => {

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
      <tr className={`h-fit border-t-[1.4px] border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-block-hover)]`}>
        <td className="sticky top-0 left-0 z-30 m-0 p-0 leading-[1]">
          <Modal>
            <ModalOpen opens="expand">
              <div className="px-6 py-4 backdrop-blur-sm hover:text-blue-200 cursor-pointer">
                <img
                  className="block w-14 h-18 aspect-[3/2] object-cover rounded-sm max-lg:hidden"
                  src={image}
                  alt={description}
                />
                <FaRegImage className="lg:hidden w-8 h-8" />
              </div>
            </ModalOpen>

            <ModalWindow name="expand">
              <ImgExpand created_at={created_at} fileName={popUrl} image={image} />
            </ModalWindow>
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

              <Toggle id={cabinId} />

              <List id={cabinId}>

                {/* ModalOpen 触发器仍然在列表里 */}
                <ModalOpen opens="pagePrint">
                  <Button icon={<HiSquare2Stack />}>Print</Button>
                </ModalOpen>

          
                <ModalOpen opens="update">
                  <Button icon={<HiPencil />}>Edit</Button>
                </ModalOpen>

                <ModalOpen opens="delete">
                  <Button icon={<HiTrash />}>Delete</Button>
                </ModalOpen>
              </List>

              {/* ModalWindow 移到了列表外面，不再受列表关闭的影响 */}
              
              <ModalWindow name="pagePrint">
                <PrintPreview data={cabin} />
              </ModalWindow>
              <ModalWindow name="update">
                <CreateForm cabinToEdit={cabin} />
              </ModalWindow>
              <ModalWindow name="delete">
                <ConfirmDelete id={cabinId} deleteUrl={popUrl} />
              </ModalWindow>
            </Menus>
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default Row;
