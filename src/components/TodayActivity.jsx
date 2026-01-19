import React from "react";
import { useTodayActivity } from "../query/dashboard/useTodayActivity";
import Spinner from "@components/Spinner";

const testData = [
  {
    id: 1,
    status: "unconfirmed",
    guests: {
      fullName: "Emma Watson",
      country: "USA",
      email: "emma@gmail.com",
      amount: "5,325.00",
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
      amount: "1,065.00",
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
      amount: "1,500.00",
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
      amount: "1,855.00",
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
      amount: "600.00",
    },
    numNights: 4,
    cabin: "Cabin E",
  },
];

const TodayActivity = () => {
  const { isPending } = useTodayActivity();

  return (
    <div className="flex flex-col justify-between bg-card text-card-foreground col-span-2 px-4 py-6 border border-border rounded-xl shadow-sm max-lg:col-span-3">
      <div>
        <h1 className="font-bold">Recent Sales</h1>
        <span className="pb-4 text-xs text-muted-foreground font-medium">
          You made 265 sales this month.
        </span>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {!isPending ? (
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
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

const TodayItem = ({ activity }) => {
  const { status, guests } = activity;
  const initials = guests.fullName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <div className="flex justify-around gap-4 ">
      <div className="flex-1 flex gap-2 items-center">
        <span className="flex justify-center items-center w-8 h-8 rounded-full bg-primary text-primary-foreground p-1 text-sm font-bold">
          {initials}
        </span>
        <span>{guests.fullName}</span>
      </div>
      <div className="flex gap-4 items-center">
        {status === "unconfirmed" && (
          <button className="min-w-20 px-1 py-2 border border-border rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Check in
          </button>
        )}
        {status === "checked-in" && (
          <button className="min-w-20 px-1 py-2 border border-border rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Check out
          </button>
        )}
      </div>
    </div>
  );
};

export default TodayActivity;
