import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  EllipsisVertical,
  Eye,
  BadgeCheck,
  Trash,
} from "lucide-react";
import React from "react";
import { useBookings } from "../query/bookings/useBookings3";
import { formatCurrency, formatDistanceFromNow } from "../utils/helpers";
import { format, isToday } from "date-fns";
import TableSkeleton from "../TableSkeleton";
import { Modal, ModalOpen, ModalWindow } from "../compose/Modal";
import { Menus, Toggle, List, Button } from "../compose/Menus";
import { useDeleteBooking } from "../query/bookings/useDeleteBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../query/bookings/useCheckout";
import ConfirmDelete from "../ConfirmDelete";
import Pagination from "../components/Pagination";

const BookingTable = () => {
  const { data, isPending } = useBookings();
  console.log(data);
  const { bookings, count } = data || {};
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState(null);
  const sortedData = React.useMemo(() => {
    if (!bookings || !sortColumn || !sortDirection) return bookings || [];

    return [...bookings].sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";

      if (sortColumn === "joinDate") {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [bookings, sortColumn, sortDirection]);

  const handleSort = (column) => {
    let newDirection = "asc";

    if (sortColumn === column) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = null;
      }
    }

    setSortColumn(newDirection ? column : null);
    setSortDirection(newDirection);
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4" />;
    }

    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4" />;
    }

    if (sortDirection === "desc") {
      return <ArrowDown className="h-4 w-4" />;
    }
    return <ArrowUpDown className="h-4 w-4" />;
  };

  if (isPending)
    return (
      <div className="min-h-full flex flex-col items-center p-6">
        <TableSkeleton />
      </div>
    );

  return (
    <div className="h-screen bg-background pt-4">
      <div className="mx-auto">
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("cabinName")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      CabinName
                      {getSortIcon("cabinName")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("guestFullName")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      GuestFullName
                      {getSortIcon("guestFullName")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("guestEmail")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      GuestEmail
                      {getSortIcon("guestEmail")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("startDate")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      StartDate
                      {getSortIcon("startDate")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Status
                      {getSortIcon("status")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("totalPrice")}
                      className="flex items-center h-auto p-0 font-semibold text-sm hover:bg-transparent hover:text-foreground gap-2 cursor-pointer"
                    >
                      Amount
                      {getSortIcon("totalPrice")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedData.map((item) => (
                  <tr
                    key={item.id}
                    className="last:border-0 border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {item.cabinName}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.guestFullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.guestEmail}
                    </td>
                    <td className="h-9 text-nowrap flex flex-col px-6 py-4 text-sm text-foreground">
                      <span>
                        {isToday(new Date(item.startDate))
                          ? "Today"
                          : formatDistanceFromNow(item.startDate)}{" "}
                        &rarr; {item.numNights} night stay
                      </span>
                      <span>
                        {format(new Date(item.startDate), "MMM dd yyyy")}{" "}
                        &mdash; {format(new Date(item.endDate), "MMM dd yyyy")}
                      </span>
                    </td>
                    <td className="px-6 py-4 h-9 text-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize`}
                      >
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Modal>
                        <Menus>
                          <div className="">
                            <Toggle id={"order"} positionY={10} positionX={10}>
                              <EllipsisVertical />
                            </Toggle>

                            <List id={"order"}>
                              <Button
                                onClick={() => navigate(`/bookings/${item.id}`)}
                              >
                                <div className="flex gap-2 items-center">
                                  <Eye size={18} strokeWidth={1.5} />
                                  <span>See details</span>
                                </div>
                              </Button>
                              {status === "unconfirmed" && (
                                <Button
                                  onClick={() =>
                                    navigate(`/checkin/${item.id}`)
                                  }
                                >
                                  <div className="flex gap-2 items-center">
                                    <BadgeCheck size={18} strokeWidth={1.5} />
                                    <span>Check in</span>
                                  </div>
                                </Button>
                              )}

                              {status === "checked-in" && (
                                <Button
                                  onClick={() => checkout(item.id)}
                                  disabled={isCheckingOut}
                                >
                                  <div className="flex gap-2 items-center">
                                    <BadgeCheck size={18} strokeWidth={1.5} />
                                    <span>Check out</span>
                                  </div>
                                </Button>
                              )}

                              <ModalOpen opens="delete">
                                <Button>
                                  <div className="flex gap-2 items-center">
                                    <Trash size={18} strokeWidth={1.5} />
                                    <span>Delete</span>
                                  </div>
                                </Button>
                              </ModalOpen>
                            </List>
                            <ModalWindow name="delete">
                              <ConfirmDelete
                                resourceName="booking"
                                onConfirm={() => deleteBooking(item.id)}
                                disabled={isDeleting}
                              />
                            </ModalWindow>
                          </div>
                        </Menus>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
