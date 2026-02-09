import React, { useState, useEffect } from "react";
import { format, isToday } from "date-fns";
import {
  AtSign,
  Calendar,
  CalendarClock,
  House,
  IdCard,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";

import { useCheckin } from "../query/bookings/useCheckin";
import { useBooking } from "../query/bookings/useBooking";
import { useSettings } from "../query/settings/useSettings";
import { formatCurrency, formatDistanceFromNow } from "../utils/helpers";
import { useMoveBack } from "../hooks/useMoveBack";
import Spinner from "@components/Spinner";
import { Button } from "./ui/Button";

const CheckinDetail = () => {
  const { booking, isPending } = useBooking();
  const { settings, isPending: isPendingSettings } = useSettings();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isPending || isPendingSettings) return <Spinner />;

  const {
    id: bookingId,
    status,
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
    guests: { fullName: guestName, email },
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
    // <div className="row-span-2 col-start-2 col-end-3 text-[var(--text-primary)]">
    //   <h1 className="pb-4">Check in booking #{bookingId}</h1>

    //   <div className="flex flex-col p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
    //     <div className="flex justify-between border-b-[2px] border-[var(--color-border)] pt-2 pb-4">
    //       <span>
    //         {numNights} nights in Cabin {cabinName}
    //       </span>
    //       <span>
    //         {format(new Date(startDate), "EEE, MMM dd yyyy")} (
    //         {isToday(new Date(startDate))
    //           ? "Today"
    //           : formatDistanceFromNow(startDate)}
    //         ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
    //       </span>
    //     </div>
    //     <div className="flex flex-col">
    //       <span className="pt-2 pb-4">
    //         countryFlag {guestName}{" "}
    //         {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""} • {email} •
    //         National ID {nationalID}
    //       </span>

    //       <span className="pt-2 pb-4">{hasBreakfast ? "Yes" : "No"}</span>
    //       <span className="pt-2 pb-4">
    //         {formatCurrency(totalPrice)}

    //         {hasBreakfast &&
    //           ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
    //             extrasPrice
    //           )} breakfast)`}

    //         {isPaid ? "Paid" : "Will pay at property"}
    //       </span>
    //     </div>
    //     <p className="self-end pt-2 pb-4">
    //       Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
    //     </p>
    //   </div>

    //   {observations && (
    //     <div className="flex gap-2 mt-4 p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
    //       {observations}
    //     </div>
    //   )}

    //   {!hasBreakfast && (
    //     <div className="flex gap-2 mt-4 p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
    //       <Checkbox
    //         checked={addBreakfast}
    //         onChange={() => {
    //           setAddBreakfast((add) => !add);
    //           setConfirmPaid(false);
    //         }}
    //         id="breakfast"
    //       >
    //         Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
    //       </Checkbox>
    //     </div>
    //   )}
    //   <div className="flex gap-2 mt-4 p-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-xl">
    //     <Checkbox
    //       checked={confirmPaid}
    //       onChange={() => setConfirmPaid((confirm) => !confirm)}
    //       disabled={confirmPaid || isCheckingIn}
    //       id="confirm"
    //     >
    //       I confirm that {guests.fullName} has paid the total amount of{" "}
    //       {!addBreakfast
    //         ? formatCurrency(totalPrice)
    //         : `${formatCurrency(
    //             totalPrice + optionalBreakfastPrice
    //           )} (${formatCurrency(totalPrice)} + ${formatCurrency(
    //             optionalBreakfastPrice
    //           )})`}
    //     </Checkbox>
    //   </div>

    //   <div className="pt-4 flex justify-end gap-4">
    //     <button className="bg-[var(--color-primary)] text-[var(--color-second)] rounded-sm p-2 border-[1px] border-[var(--color-border)]">
    //       Check in booking #{bookingId}
    //     </button>
    //     <button
    //       onClick={moveBack}
    //       className="p-2 border-2 text-[var(--color-primary)] bg-[var(--color-second)] border-[var(--color-border)] rounded-sm"
    //     >
    //       Back
    //     </button>
    //   </div>
    // </div>

    <div className="pt-4 bg-card font-medium text-foreground">
      <div className="p-4 border border-border shadow-sm rounded-lg bg-background text-foreground font-medium sm:p-6">
        <div className="flex flex-col-reverse gap-2 sm:flex sm:justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">
              Reservation Information - NO.{bookingId}
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete details for this booking
            </p>
          </div>
          <div className="self-end p-1 border border-border rounded-md">
            {status}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-y-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <IdCard size={16} />
              <span>Customer Name</span>
            </div>
            <h4 className="font-bold text-lg">{guestName}</h4>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <AtSign size={16} />
              <span>Customer Email</span>
            </div>
            <h4 className="font-bold text-lg">{email}</h4>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <UsersRound size={16} />

              <span>Occupancy</span>
            </div>
            <h4 className="font-bold text-lg">{numGuests}</h4>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <House size={16} />
              <span>Room Name</span>
            </div>
            <h4 className="font-bold text-lg">{`NO.${cabinName}`}</h4>
          </div>

          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <UtensilsCrossed size={16} />
              <span>Breakfast included?</span>
            </div>
            <h4 className="font-bold text-lg">{hasBreakfast ? "Yes" : "No"}</h4>
          </div>

          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar size={16} />
              <span>Check-in Date</span>
            </div>
            <h4 className="font-bold text-lg">
              {format(new Date(startDate), "EEE, MMM dd yyyy")} (
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}
              )
            </h4>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarClock size={16} />
              <span>Check-out Date</span>
            </div>
            <h4 className="font-bold text-lg">
              {format(new Date(endDate), "EEE, MMM dd yyyy")}
            </h4>
          </div>
          <hr className="text-muted-foreground col-span-2" />
        </div>

        <div className="bg-secondary my-6 p-4 border border-border rounded-md flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
          <span className="text-nowrap text-muted-foreground text-sm">
            Room Rate
          </span>
          <span className="font-bold text-lg">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}{" "}
            {isPaid ? "Paid" : "Will pay at property"}
          </span>
        </div>

        <div className="bg-secondary my-6 p-4 border border-border rounded-md flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
          <span className="text-nowrap text-muted-foreground text-sm">
            Total Duration
          </span>
          <span className="font-bold text-lg">{numNights} nights</span>
        </div>

        {observations && (
          <div className="bg-secondary my-6 p-4 border border-border rounded-md flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
            <span className="text-nowrap text-muted-foreground text-sm">
              Observations
            </span>
            <span className="font-bold text-lg">{observations}</span>
          </div>
        )}

        {!hasBreakfast && (
          <div className="bg-secondary my-6 p-4 border border-border rounded-md">
            <Checkbox
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((add) => !add);
                setConfirmPaid(false);
              }}
              id="breakfast"
            >
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
              ?
            </Checkbox>
          </div>
        )}

        <div className="bg-secondary my-6 p-4 border border-border rounded-md ">
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
                  totalPrice + optionalBreakfastPrice,
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice,
                )})`}
          </Checkbox>
        </div>

        <p className="text-sm text-muted-foreground">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>

        <div className="flex flex-col gap-4 items-center mt-4 md:flex-row md:justify-end">
          <Button
            size="md"
            variant="primary"
            onClick={handleCheckin}
            disabled={!confirmPaid || isCheckingIn}
            className="w-full text-nowrap py-1 px-2 border border-border rounded-md md:w-auto disabled:cursor-not-allowed"
          >
            Confirm Order
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={moveBack}
            className="w-full text-nowrap py-1 px-2 border border-border rounded-md md:w-auto"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between md:gap-4">
      <input
        className="min-w-6 min-h-6 self-end"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="font-bold text-lg" htmlFor={!disabled ? id : ""}>
        {children}
      </label>
    </div>
  );
};

export default CheckinDetail;
