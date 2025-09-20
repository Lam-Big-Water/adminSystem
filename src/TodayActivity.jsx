import React from "react";
import { useTodayActivity } from "./query/dashboard/useTodayActivity";

const testData = [
  {
    id: 1,
    status: "unconfirmed",
    guests: {
      fullName: "John Doe",
      country: "USA",
      email: "john@example.com",
    },
    numNights: 3,
    cabin: "Cabin A",
  },
  {
    id: 2,
    status: "checked-in",
    guests: {
      fullName: "Maria Garcia",
      country: "Spain",
      email: "maria@example.com",
    },
    numNights: 5,
    cabin: "Cabin B",
  },
  {
    id: 3,
    status: "unconfirmed",
    guests: {
      fullName: "David Kim",
      country: "South Korea",
      email: "david@example.com",
    },
    numNights: 2,
    cabin: "Cabin C",
  },
  {
    id: 4,
    status: "checked-in",
    guests: {
      fullName: "Sarah Johnson",
      country: "Canada",
      email: "sarah@example.com",
    },
    numNights: 7,
    cabin: "Cabin D",
  },
  {
    id: 5,
    status: "unconfirmed",
    guests: {
      fullName: "Ahmed Hassan",
      country: "Egypt",
      email: "ahmed@example.com",
    },
    numNights: 4,
    cabin: "Cabin E",
  },
];

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="flex flex-col col-span-2 p-4 bg-[var(--color-block)] border border-[var(--color-border)] rounded-lg max-lg:col-span-3">
      <h1 className="text-lg font-black">Recent Sales</h1>
      <span className="pb-4 text-xs text-[var(--text-second)] font-medium">You made 265 sales this month.</span>
      <div className="flex flex-col gap-4">
      {!isLoading ? (
        testData?.length > 0 ? (
          <>
            {testData.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </>
        ) : (
          <h2>No activity today...</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
      </div>
    </div>
  );
};

const TodayItem = ({ activity }) => {
  const { id, status, guests, numNights } = activity;
  const initials = guests.fullName
  .split(' ')
  .map(word => word.charAt(0))
  .join('');
  return (
    <div className="flex justify-around gap-4 ">
      <div className="flex-1 flex gap-2 items-center">
        <span className="flex justify-center items-center w-8 h-8 rounded-full bg-[var(--primary-button-bg)] text-[var(--primary-button-text)] text-lg font-bold">{initials}</span>
        <span>{guests.fullName}</span>
        
      </div>
      <div className="flex gap-4 items-center">
      {status === "unconfirmed" && <button className="p-1 border border-[var(--color-border)] rounded-md">Check in</button>}
        {status === "checked-in" && <button className="p-1 border border-[var(--color-border)] rounded-md">Check out</button>}
        <span>{numNights} nights</span>
        
      </div>
    </div>
  );
};

export default TodayActivity;
