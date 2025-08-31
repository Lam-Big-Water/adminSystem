import React, { useState, useEffect } from "react";
import { format, isToday } from "date-fns";

import { useCheckin } from "../query/bookings/useCheckin";
import { useBooking } from "../query/bookings/useBooking";
import { useSettings } from "../query/settings/useSettings";
import { formatCurrency, formatDistanceFromNow } from "../utils/helpers";
import { useMoveBack } from "../hooks/useMoveBack";

const checkin = () => {
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <h1>Loading...</h1>;

  const {
    id: bookingId,
    guests,
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

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <div className="row-span-2 col-start-2 col-end-3 text-[var(--text-primary)]">
      <h1 className="pb-4">Check in booking #{bookingId}</h1>

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
            countryFlag {guestName}{" "}
            {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""} • {email} •
            National ID {nationalID}
          </span>

          <span className="pt-2 pb-4">{hasBreakfast ? "Yes" : "No"}</span>
          <span className="pt-2 pb-4">
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}

            {isPaid ? "Paid" : "Will pay at property"}
          </span>
        </div>
        <p className="self-end pt-2 pb-4">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </div>

      {observations && (
        <div className="flex gap-2 mt-4 p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
          {observations}
        </div>
      )}

      {!hasBreakfast && (
        <div className="flex gap-2 mt-4 p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </div>
      )}
      <div className="flex gap-2 mt-4 p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </div>

      <div className="pt-4 flex justify-end gap-4">
        <button className="bg-[var(--color-primary)] text-[var(--color-second)] rounded-sm p-2 border-[1px] border-[var(--color-border)]">
          Check in booking #{bookingId}
        </button>
        <button
          onClick={moveBack}
          className="p-2 border-2 text-[var(--color-primary)] bg-[var(--color-second)] border-[var(--color-border)] rounded-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </>
  );
};

export default checkin;
