import React from "react";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useBookings } from "./query/bookings/useBookings";
import { formatCurrency, formatDistanceFromNow } from "./utils/helpers";
import StatusBadge from "./StatusBadge";

import { Modal, ModalOpen, ModalWindow } from "./compose/Modal";
import { Menus, Toggle, List, Button } from "./compose/Menus";
import { useDeleteBooking } from "./query/bookings/useDeleteBooking";
import { useCheckout } from "./query/bookings/useCheckout";

import {
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineTrash,
  HiEllipsisVertical
} from "react-icons/hi2";

import ConfirmDelete from "./ConfirmDelete";

const BookingTable = () => {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <h1>Loading...</h1>;

  if (!bookings.length) return <h1>Empty...</h1>;
  return (
    <div className="mt-6 overflow-x-auto border-[1px] border-[var(--color-border)] rounded-xl overflow-hidden">
      <table className="table whitespace-nowrap w-full text-left text-sm font-normal text-[var(--text-primary)] border-collapse border-spacing-0 table-layout-fixed">
        <thead className="bg-[var(--color-block)]">
          <tr className="">
            <th className="px-6 py-3 "></th>
            <th className="px-6 py-3 ">Cabin</th>
            <th className="px-6 py-3 ">Guest</th>
            <th className="px-6 py-3 ">Dates</th>
            <th className="px-6 py-3 ">Status</th>
            <th className="px-6 py-3 ">Amount</th>
            <th className="px-6 py-3 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BookingRow = ({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) => {
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <tr className="bg-[var(--color-bg)] text-[var(--color-primary)] border-t-[1.4px] border-[var(--color-border)]">
      <td className="px-6 py-4">❖</td>
      <td className="px-6 py-4">{cabinName}</td>
      <td className="flex flex-col px-6 py-4">
        <span>{guestName}</span>
        <span>{email}</span>
      </td>

      <td className="px-6 py-4">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4">{formatCurrency(totalPrice)}</td>
      <td className="px-6 py-4">
        <Modal>
          <Menus>
            <div className="">
              <Toggle
              styles="flex justify-center w-6 hover:bg-[var(--color-block)] cursor-pointer rounded-sm"
                icon={<HiEllipsisVertical className="text-[1.3rem]"/>}
                className="text-xl ml-auto"
                id={"order"}
                positionY={10}
                positionX={10}
              />

              <List id={"order"}>
                <Button
                  onClick={() => navigate(`/bookings/${bookingId}`)}
                  icon={<HiOutlineEye className="text-lg" />}
                >
                  See details
                </Button>
                {status === "unconfirmed" && (
                  <Button
                    onClick={() => navigate(`/checkin/${bookingId}`)}
                    icon={<HiOutlineCheckCircle className="text-lg" />}
                  >
                    Check in
                  </Button>
                )}

                {status === "checked-in" && (
                  <Button
                    onClick={() => checkout(bookingId)}
                    icon={<HiOutlineCheckCircle className="text-lg" />}
                    disabled={isCheckingOut}
                  >
                    Check out
                  </Button>
                )}

                <ModalOpen opens="delete">
                  <Button icon={<HiOutlineTrash />}>Delete</Button>
                </ModalOpen>
              </List>
              <ModalWindow name="delete">
                <ConfirmDelete
                  resourceName="booking"
                  onConfirm={() => deleteBooking(bookingId)}
                  disabled={isDeleting}
                />
              </ModalWindow>
            </div>
          </Menus>
        </Modal>
      </td>
    </tr>
  );
};

export default BookingTable;
