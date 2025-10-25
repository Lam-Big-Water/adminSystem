import React from "react";
import Filter from "../Filter";

import { useRecentBookings } from "../query/dashboard/useRecentBooking";
import { useRecentStays } from "../query/dashboard/useRecentStays";
import { useGetAllCabins } from "../query/cabins/useGet";
import TodayActivity from "../TodayActivity";
import DurationChart from "../DurationChart";
import SalesChart from "../SalesChart";
import Spinner from "../Spinner";
import { HiOutlineBellAlert, HiOutlineCurrencyDollar, HiOutlineCheckBadge, HiOutlineChartBar } from "react-icons/hi2";

const dashboard = () => {
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

  return (
    <div className="text-[var(--text-primary)]">
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

      <div className="pt-6 grid grid-cols-4 gap-2 max-lg:grid-cols-1">
        <div className="col-span-4 grid grid-cols-4 gap-2 max-lg:col-span-3 max-lg:grid max-lg:grid-cols-2 max-lg:gap-2 max-md:grid-cols-1">
          <li className="p-4 block bg-[var(--color-block)] border border-[var(--color-border)] rounded-lg">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Bookings</span>
                <span className="ml-auto"><HiOutlineBellAlert /></span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-black">{numBookings ? numBookings : "Empty"}</span>
                <span className="text-xs text-[var(--text-second)]">{Math.round(numBookings * 0.1) + "%"} from last month</span>
              </div>
            </div>
          </li>

          <li className="p-4 block bg-[var(--color-block)] border border-[var(--color-border)] rounded-lg">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Sales</span>
                <span className="ml-auto"><HiOutlineCurrencyDollar /></span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-black">{sales ? `$${sales}` : "Empty"}</span>
                <span className="text-xs text-[var(--text-second)]">{Math.round(sales * 0.01) + "%"} from last month</span>
              </div>
            </div>
          </li>

          <li className="p-4 block bg-[var(--color-block)] border border-[var(--color-border)] rounded-lg">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Check ins</span>
                <span className="ml-auto"><HiOutlineCheckBadge /></span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-black">{checkins ? `${checkins}` : "Empty"}</span>
                <span className="text-xs text-[var(--text-second)]">{Math.round(checkins * 0.01) + "%"} from last month</span>
              </div>
            </div>
          </li>

          <li className="p-4 block bg-[var(--color-block)] border border-[var(--color-border)] rounded-lg">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Occupancy rate</span>
                <span className="ml-auto"><HiOutlineChartBar /></span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-black">{occupation ? `${occupation.toFixed(2)}` : "Empty"}</span>
                <span className="text-xs text-[var(--text-second)]">{Math.round(occupation * 100) + "%"} from last month</span>
              </div>
            </div>
          </li>

          
{/* 
          <li className="p-4 flex items-center gap-2 bg-[var(--color-block)]">
            <span className="w-12 text-2xl">⏱</span>
            <div className="flex flex-col">
              <span>Check ins</span>
              <span>{checkins}</span>
            </div>
          </li> */}

          {/* <li className="p-4 flex items-center gap-2 bg-[var(--color-block)]">
            <span className="w-12 text-2xl">📈</span>
            <div className="flex flex-col">
              <span>Occupancy rate</span>
              <span>{Math.round(occupation * 100) + "%"}</span>
            </div>
          </li> */}
        </div>

        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart bookings={bookings} numDays={numDays} />
      </div>
    </div>
  );
};

export default dashboard;
