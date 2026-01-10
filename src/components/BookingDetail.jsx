import {
  AtSign,
  Calendar,
  CalendarClock,
  House,
  IdCard,
  UsersRound,
} from "lucide-react";
import { format, isToday } from "date-fns";
import { useBooking } from "../query/bookings/useBooking";
import { useDeleteBooking } from "../query/bookings/useDeleteBooking";
import { formatDistanceFromNow, formatCurrency } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";
import { Modal, Open, Window } from "../compose/Modal2";
import Spinner from "../Spinner";
import ConfirmDelete from "../ConfirmDelete"


const BookingDetails = () => {
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
    <div className="bg-card font-medium text-foreground">
      <div className="my-4">
        <h2 className="text-2xl font-black">Booking Details</h2>
        <p className="text-sm text-muted-foreground">
          View and manage your reservation information
        </p>
      </div>

      <div className="p-6 border border-border rounded-2xl bg-background text-foreground font-medium">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">
              Reservation Information - NO.{bookingId}
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete details for this booking
            </p>
          </div>
          <div className="self-start p-1 border border-border rounded-md">
            {status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-6">
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
            <h4 className="font-bold text-lg">{cabinName}</h4>
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

        <div className="bg-secondary my-6 p-4 border border-border rounded-md flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total Price</span>
          <span className="font-bold text-lg">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}{" "}
            {isPaid ? "Paid" : "Will pay at property"}
          </span>
        </div>

        <div className="bg-secondary my-6 p-4 border border-border rounded-md flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total Duration</span>
          <span className="font-bold text-lg">{numNights} nights</span>
        </div>

        <p className="text-sm text-muted-foreground">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>

        <div className="flex justify-end gap-4 items-center mt-4">
          <button className="py-1 px-2 border border-border rounded-md">
            Check out
          </button>
          <Modal>
            <Open id="delete-booking">
          <button className="py-1 px-2 border border-border rounded-md">
            Delete Booking
          </button>
          </Open>

          <Window id="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId, {
                onSettled: () => navigate(-1),
              })}
              disabled={isDeleting}
            />
          </Window>
          </Modal>
          <button onClick={moveBack} className="py-1 px-2 border border-border rounded-md">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
