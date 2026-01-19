import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { useDarkMode } from "../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const SimpleBarChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const limitedDates = allDates.slice(-12);
  const data = limitedDates.map((date) => {
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
        }
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
        }
      };

  return (
    <div className="flex flex-col col-span-3 p-4 border border-border rounded-xl shadow-sm bg-card text-card-foreground">
      <h1 className="font-bold pb-4">Overview</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="5%" responsive>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={styles.axis}
            // 关键配置
            interval="preserveStartEnd" // 智能间隔显示
            minTickGap={10} // 最小标签间距
            // 确保刻度对齐
            allowDataOverflow={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={styles.axis}
          />
          <Bar dataKey="totalSales" fill={styles.bar.backgroundColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
