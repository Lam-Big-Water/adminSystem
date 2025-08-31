import React from "react";
import { useTodayActivity } from "./query/dashboard/useTodayActivity";

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="flex flex-col col-span-2 p-4 bg-[var(--color-block)]">
      <h1>Today</h1>
      {!isLoading ? (
        activities?.length > 0 ? (
          <>
          {activities.map((activity) => (
            <TodayItem activity={activity}/>
          ))}
          </>
        ) : (
          <h2>No activity today...</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

const TodayItem = ({activity}) => {
    const { id, status, guests, numNights } = activity;

    return (
        <div className="flex justify-around gap-4 ">
            <div className="flex-1 flex gap-2 items-center">
              {status === "unconfirmed" && <span>Arriving</span>}
              {status === "checked-in" && <span>Departing</span>}
              <span>{guests.fullName}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>{numNights} nights</span>
              {status === "unconfirmed" && <button>Check in</button>}
              {status === "checked-in" && <button>Check out</button>}
              
            </div>
          </div>
    )
}

export default TodayActivity;

