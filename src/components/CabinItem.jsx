import React from "react";
import ImgExpand from "@components/ImagePreview";
import { Modal, Open, Window } from "../compose/Modal2";
import Dialog from "@components/Dialog";
import { Toggle, List, Button } from "../compose/Menus";
import { SquarePen, Trash } from "lucide-react";
import PrintPreview from "../PrintPreview";
import CreateForm from "../CreateForm";
import ConfirmDelete from "../ConfirmDelete";

const CabinItem = ({ cabin }) => {
  const popUrl = cabin.image.split("/").pop();

  /*
    {
    "id": 159,
    "created_at": "2026-01-14T01:45:08.146047+00:00",
    "name": "004",
    "maxCapacity": 4,
    "regularPrice": 500,
    "discount": 50,
    "description": "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
    "image": "https://uhovqnjvlmtxdpxmetpp.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg",
    "uploadTime": null
}
    */
  return (
    <li className="bg-background text-foreground font-medium p-4 border border-border rounded-lg">
      <div className="flex justify-between items-center mb-8">
        {/* <img className='w-full h-full object-cover' src={cabin.image} alt={cabin.description} /> */}
        <Modal>
          <Open id="expand">
            <button className="w-10 h-10 rounded-md overflow-hidden border-2 border-primary">
              <img
                className="w-full h-full object-cover"
                src={cabin.image}
                alt={cabin.description}
              />
            </button>
          </Open>

          <Window id="expand">
            <Dialog>
              <ImgExpand
                image={cabin.image}
                title={cabin.name}
                description={cabin.description}
              />
            </Dialog>
          </Window>
        </Modal>

        <Modal>
          <Toggle
            className="h-9 border border-border py-1 px-2 rounded-md bg-background text-sm font-medium hover:bg-muted"
            id={cabin.id}
          >
            Manage
          </Toggle>

          <List
            className="w-[160px] flex flex-col p-1 bg-background text-foreground border border-border shadow-sm rounded-lg"
            id={cabin.id}
          >
            <Open id="pagePrint">
              <Button className="flex justify-between items-center py-1.5 px-2 text-sm text-left rounded-md hover:bg-muted ">
                <span>Print</span>
              </Button>
            </Open>
            <div className="-mx-1 my-1 h-px bg-border"></div>

            <Open id="update">
              <Button>
                <div className="flex justify-between items-center py-1.5 px-2 text-sm text-left rounded-md hover:bg-muted ">
                  <span>Edit</span>
                  <SquarePen size={16} strokeWidth={2} />
                </div>
              </Button>
            </Open>
            <div className="-mx-1 my-1 h-px bg-border"></div>

            <Open id="delete">
              <Button>
                <div className="flex justify-between items-center py-1.5 px-2 text-sm text-left rounded-md hover:bg-muted ">
                  <span>Delete</span>
                  <Trash size={16} strokeWidth={2} />
                </div>
              </Button>
            </Open>
          </List>

          <Window id="pagePrint">
            <PrintPreview data={cabin} />
          </Window>
          <Window id="update">
            <CreateForm cabinToEdit={cabin} />
          </Window>
          <Window id="delete">
            <ConfirmDelete id={cabin.id} deleteUrl={popUrl} />
          </Window>
        </Modal>
      </div>

      <div>
        <h3 className="font-semibold mb-1">{`No.${cabin.name} - $${cabin.regularPrice}`}</h3>

        <p className="text-sm line-clamp-2 font-normal text-muted-foreground">
          {cabin.description}
        </p>

        <p className="mt-2 text-end">{cabin.maxCapacity} Person</p>
      </div>
    </li>
  );
};

export default CabinItem;
