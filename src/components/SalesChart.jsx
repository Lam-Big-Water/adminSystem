import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDarkMode } from "../context/DarkModeContext";
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

  const styles = isDarkMode
    ? {
        axis: {
          text: "#888888",
          fontSize: "12px",
          fontWeight: 400, // 字重
          fontFamily: "Inter", // 字体
        },
        bar: {
          backgroundColor: "#e2e8f0",
        },
        Area: {
          stroke: "#F9FAFC",
          fill: "#818181",
          strokeWidth: 1,
        },
      }
    : {
        axis: {
          text: "#888888",
          fontSize: "12px",
          fontWeight: 400, // 字重
          fontFamily: "Inter", // 字体
        },
        bar: {
          backgroundColor: "#0f172b",
        },

        Area: {
          stroke: "#010617",
          fill: "#DBDCDF",
          strokeWidth: 1,
        },
      };
  return (
    <div className="border border-border rounded-xl shadow-sm bg-card text-card-foreground col-span-4 p-4 max-lg:col-span-3">
      <h1 className="font-bold pb-4">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </h1>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={styles.axis}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            unit="$"
            tick={styles.axis}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#DBDCDF", borderRadius: "8px" }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={styles.Area.stroke}
            fill={styles.Area.fill}
            strokeWidth={styles.Area.strokeWidth}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={styles.Area.stroke}
            fill={styles.Area.fill}
            strokeWidth={styles.Area.strokeWidth}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
