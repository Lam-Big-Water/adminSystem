import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Ellipsis,
  Eye,
  BadgeCheck,
  Trash,
} from "lucide-react";
import React from "react";
import { useBookings } from "../query/bookings/useBookings3";
import { formatCurrency, formatDistanceFromNow } from "../utils/helpers";
import { format, isToday } from "date-fns";
import { Modal, ModalOpen, ModalWindow } from "../compose/Modal";
import { Menus, Toggle, List, Button } from "../compose/Menus";
import { useDeleteBooking } from "../query/bookings/useDeleteBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../query/bookings/useCheckout";
import ConfirmDelete from "../ConfirmDelete";
import Pagination from "../components/Pagination";
import Spinner from "./Spinner";

const BookingTable = () => {
  const { data, isPending } = useBookings();
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
      return <ChevronsUpDown size={14} strokeWidth={2} />;
    }

    if (sortDirection === "asc") {
      return <ChevronUp size={14} strokeWidth={2} />;
    }

    if (sortDirection === "desc") {
      return <ChevronDown size={14} strokeWidth={2} />;
    }
    return <ChevronsUpDown size={14} strokeWidth={2} />;
  };

  if (isPending) return <Spinner />;

  return (
    <div className="bg-background pt-4">
      <div className="mx-auto">
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border hover:bg-muted">
                <tr>
                  <th className="h-12 text-left">
                    <div className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted"></div>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("cabinName")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      CabinName
                      {getSortIcon("cabinName")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("guestFullName")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      GuestFullName
                      {getSortIcon("guestFullName")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("guestEmail")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      GuestEmail
                      {getSortIcon("guestEmail")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("startDate")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      StartDate
                      {getSortIcon("startDate")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("status")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Status
                      {getSortIcon("status")}
                    </button>
                  </th>
                  <th className="h-12 text-left">
                    <button
                      onClick={() => handleSort("totalPrice")}
                      className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm hover:bg-muted-foreground/10"
                    >
                      Amount
                      {getSortIcon("totalPrice")}
                    </button>
                  </th>
                  <th className="h-12 text-left px-2">
                    <span className="h-8 font-medium flex items-center gap-2 px-2 rounded-sm text-sm"></span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedData.map((item) => (
                  <tr
                    key={item.id}
                    className="last:border-0 border-b border-border text-nowrap hover:bg-muted"
                  >
                    <td className="p-2 text-sm font-medium text-foreground text-nowrap"></td>
                    <td className="p-2 text-sm font-medium text-foreground text-nowrap">
                      {item.cabinName}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground text-nowrap">
                      {item.guestFullName}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground text-nowrap">
                      {item.guestEmail}
                    </td>
                    <td className="h-12 text-nowrap flex flex-col p-2 text-xs text-foreground">
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
                    <td className="p-2 h-9 text-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize`}
                      >
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </td>
                    <td className="p-2">
                      <Modal>
                        <Menus>
                          <div className="">
                            <Toggle
                              className="flex justify-center items-center p-1 rounded-sm hover:bg-muted-foreground/10"
                              id="order"
                              positionY={10}
                              positionX={10}
                            >
                              <Ellipsis size={16} strokeWidth={2} />
                            </Toggle>

                            <List
                              className="flex flex-col p-1 bg-background text-foreground border border-border shadow-sm rounded-lg"
                              id="order"
                            >
                              <Button
                                className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted "
                                onClick={() => navigate(`/bookings/${item.id}`)}
                              >
                                <div className="flex gap-2 items-center">
                                  <Eye size={16} strokeWidth={2} />
                                  <span>See details</span>
                                </div>
                              </Button>
                              {status === "unconfirmed" && (
                                <Button
                                  className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted "
                                  onClick={() =>
                                    navigate(`/checkin/${item.id}`)
                                  }
                                >
                                  <div className="flex gap-2 items-center">
                                    <BadgeCheck size={16} strokeWidth={2} />
                                    <span>Check in</span>
                                  </div>
                                </Button>
                              )}

                              {status === "checked-in" && (
                                <Button
                                  className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted "
                                  onClick={() => checkout(item.id)}
                                  disabled={isCheckingOut}
                                >
                                  <div className="flex gap-2 items-center">
                                    <BadgeCheck size={16} strokeWidth={2} />
                                    <span>Check out</span>
                                  </div>
                                </Button>
                              )}

                              <ModalOpen opens="delete">
                                <Button className="flex py-1.5 ps-2 pe-8 text-sm text-left rounded-md hover:bg-muted ">
                                  <div className="flex gap-2 items-center">
                                    <Trash size={16} strokeWidth={2} />
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
