import React from "react";
import { useSettings } from "../query/settings/useSettings";
import { useUpdateSetting } from "../query/settings/useUpdateSetting";
import Spinner from "../Spinner";

const settings = () => {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <div className="text-[var(--text-primary)] font-normal bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl">
      <form className="flex flex-col p-5 gap-4">
        <div>
          <h2 className="text-lg font-bold">Update hotel settings</h2>
          <span className="text-[var(--text-second)] text-sm">
            Enter your new choice below to update your setting
          </span>
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label
            className="flex flex-col font-bold flex-1"
            htmlFor="min-nights"
          >
            Minimum nights/booking
          </label>
          <input
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            defaultValue={minBookingLength}
            id="min-nights"
            className="flex-1 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="number"
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label
            htmlFor="max-nights"
            className="flex flex-col font-bold flex-1"
          >
            Maximum nights/booking
          </label>
          <input
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
            defaultValue={maxBookingLength}
            id="max-nights"
            className="flex-1 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="number"
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label htmlFor="ax-guests" className="flex flex-col flex-1 font-bold">
            Maximum guests/booking
          </label>

          <input
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
            defaultValue={maxGuestsPerBooking}
            id="ax-guests"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="number"
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label
            htmlFor="breakfast-price"
            className="flex flex-col flex-1 font-bold"
          >
            Breakfast price
          </label>

          <input
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
            defaultValue={breakfastPrice}
            id="breakfast-price"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="number"
          />
        </div>
      </form>
    </div>
  );
};

export default settings;
