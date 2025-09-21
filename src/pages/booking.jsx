import React from "react";
import { format, isToday } from "date-fns";
import { useBooking } from "../query/bookings/useBooking";
import { formatDistanceFromNow, formatCurrency } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";

import StatusBadge from "../StatusBadge";
import { Modal, ModalOpen, ModalWindow } from "../compose/Modal";
import ConfirmDelete from "../ConfirmDelete"
import {useDeleteBooking} from "../query/bookings/useDeleteBooking"
import Spinner from "../Spinner";
const booking = () => {
  const { booking, isPending } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();



  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!booking) return <h1>Empty...</h1>;

  const {
    status,
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;
  return (
    <div className="row-span-2 col-start-2 col-end-3 text-[var(--text-primary)]">
      <div className="flex items-center gap-4 pb-4">
        <h1 className="text-2xl">Booking #{bookingId}</h1>
        <StatusBadge status={status} />
      </div>

      <div className="flex flex-col p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
        <div className="flex justify-between border-b-[2px] border-[var(--color-border)] pt-2 pb-4">
          <span>
            {numNights} nights in Cabin {cabinName}
          </span>
          <span>
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="pt-2 pb-4">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""} •{" "}
            {email} • National ID {nationalID}
          </span>
          <span className="pt-2 pb-4">
            Breakfast included? {hasBreakfast ? "Yes" : "No"}
          </span>
          <span className="pt-2 pb-4">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}{" "}
            {isPaid ? "Paid" : "Will pay at property"}
          </span>
        </div>
        <p className="self-end pt-2 pb-4">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </div>
      <div className="pt-4 flex justify-end gap-4">

        <button className="text-[var(--color-second)] bg-[var(--color-primary)] rounded-sm p-2 border-[1px] border-[var(--sidebar-border)]">
          Check out
        </button>
        <Modal>
          <ModalOpen opens="delete">
            <button className="p-2 border-2 text-[var(--color-primary)] border-red-400 rounded-sm">
            Delete booking
          </button>
          </ModalOpen>

          <ModalWindow name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId, {
                onSettled: () => navigate(-1),
              })}
              disabled={isDeleting}
            />
          </ModalWindow>
        </Modal>
        
        <button
          onClick={moveBack}
          className="text-[var(--color-primary)] p-2 border-2 border-[var(--color-border)] rounded-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default booking;
