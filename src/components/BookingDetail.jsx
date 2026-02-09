import {
  AtSign,
  Calendar,
  CalendarClock,
  House,
  IdCard,
  UsersRound,
    UtensilsCrossed,
} from "lucide-react";
import { format, isToday } from "date-fns";
import { useBooking } from "../query/bookings/useBooking";
import { useDeleteBooking } from "../query/bookings/useDeleteBooking";
import { formatDistanceFromNow, formatCurrency } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";
import { Modal, Open, Window } from "../compose/Modal2";
import { useCheckout } from "../query/bookings/useCheckout";
import Spinner from "@components/Spinner";
import ConfirmDelete from "../ConfirmDelete";
import { Button } from "./ui/Button";

const BookingDetails = () => {
  const { booking, isPending } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

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
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;
  return (
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
            Total Price
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

        <p className="text-sm text-muted-foreground">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>

        <div className="flex flex-col gap-4 items-center mt-4 md:flex-row md:justify-end">
          {status === "unconfirmed" && (
            <Button size="md" variant="primary" onClick={() => navigate(`/checkin/${bookingId}`)} className="w-full text-nowrap py-1 px-2 border border-border rounded-md md:w-auto">
            Check in
          </Button>
          )}

          {status === "checked-in" && (
            <Button size="md" variant="primary" disabled={isCheckingOut} onClick={() => checkout(bookingId)} className="w-full text-nowrap py-1 px-2 border border-border rounded-md md:w-auto disabled:cursor-not-allowed">
            Check out
          </Button>
          )}
          <Modal>
            <Open id="delete-booking">
              <Button size="lg" variant="notice" className="w-full text-nowrap py-1 px-2 border border-border rounded-md md:w-auto">
                Delete Booking
              </Button>
            </Open>

            <Window id="delete-booking">
              <ConfirmDelete
                resourceName={bookingId}
                onConfirm={() =>
                  deleteBooking(bookingId, {
                    onSettled: () => navigate(-1),
                  })
                }
                disabled={isDeleting}
              />
            </Window>
          </Modal>
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

export default BookingDetails;
