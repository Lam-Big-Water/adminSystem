import React from 'react'
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";

  import {useDarkMode} from "./context/DarkModeContext"
  import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";


const SalesChart = ({ bookings, numDays }) => {
    const { isDarkMode } = useDarkMode();

    const allDates = eachDayOfInterval({
      start: subDays(new Date(), numDays - 1),
      end: new Date(),
    });

    const data = allDates.map((date) => {
        return {
          label: format(date, "MMM dd"),
          totalSales: bookings
            .filter((booking) => isSameDay(date, new Date(booking.created_at)))
            .reduce((acc, cur) => acc + cur.totalPrice, 0),
          extrasSales: bookings
            .filter((booking) => isSameDay(date, new Date(booking.created_at)))
            .reduce((acc, cur) => acc + cur.extrasPrice, 0),
        };
      });

      const colors = isDarkMode
      ? {
          totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
          extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#e5e7eb",
          background: "#18212f",
        }
      : {
          totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
          extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
          text: "#374151",
          background: "#fff",
        };
  return (
    <div className='border border-[var(--color-border)] rounded-lg col-span-4 p-4 bg-[var(--color-block)] max-lg:col-span-3'>
        <h1 className='text-lg font-black pb-4'>
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
        </h1>

        <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesChart