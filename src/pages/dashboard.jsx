import React from "react";
import Filter from "../Filter";
import { useRecentBookings } from "../query/dashboard/useRecentBooking";
import { useRecentStays } from "../query/dashboard/useRecentStays";
import { useGetAllCabins } from "../query/cabins/useGet";
import TodayActivity from "@components/TodayActivity";
import SalesChart from "@components/SalesChart";
import Spinner from "@components/Spinner";
import Card from "@/components/Card";
import { BellRing, CreditCard, UsersRound, ChartBarBig } from "lucide-react";
import SimpleBarChart from "@components/SimpleBarChart";
import Caption from "@/components/Caption";

const Dashboard = () => {
  const { bookings, isPending: isPending1 } = useRecentBookings();
  const { confirmedStays, isPending: isPending2, numDays } = useRecentStays();
  const { cabins, isPending: isPending3 } = useGetAllCabins();

  if (isPending1 || isPending2 || isPending3) return <Spinner />;

  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabins.length);

  const bookingIncome = numBookings ? `+${numBookings}` : 0;
  const bookingRate = Math.round(numBookings * 0.1) + "%";

  const saleIncome = sales ? `$${sales}` : 0;
  const saleRate = Math.round(sales * 0.01) + "%";

  const checkinIncome = checkins ? `+${checkins}` : 0;
  const checkinRate = Math.round(checkins * 0.01) + "%";

  const occupationIncome = occupation ? `+${occupation.toFixed(2)}` : 0;
  const occupationRate = Math.round(occupation * 100) + "%";

  return (
    <div className="max-w-7xl w-full m-auto px-4 py-6">
      <Caption title="Dashboard">
        <button className="flex items-center gap-1 text-sm font-medium text-primary-foreground bg-primary  py-2 px-3 rounded-md hover:bg-primary/90 transition-colors duration-200">
          Download
        </button>
      </Caption>
      <div className="flex justify-between">
        <Filter
          filterField="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <div className="col-span-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Booking"
            income={bookingIncome}
            rate={bookingRate}
            icon={<BellRing size={18} strokeWidth={2} />}
          />
          <Card
            title="Sales"
            income={saleIncome}
            rate={saleRate}
            icon={<CreditCard size={18} strokeWidth={2} />}
          />
          <Card
            title="Check ins"
            income={checkinIncome}
            rate={checkinRate}
            icon={<UsersRound size={18} strokeWidth={2} />}
          />
          <Card
            title="Occupancy"
            income={occupationIncome}
            rate={occupationRate}
            icon={<ChartBarBig size={18} strokeWidth={2} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 col-span-5 lg:grid-cols-5">
          <SimpleBarChart bookings={bookings} numDays={numDays} />
          <TodayActivity />
        </div>
        <SalesChart bookings={bookings} numDays={numDays} />
      </div>
    </div>
  );
};

export default Dashboard;
