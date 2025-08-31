import React from 'react'
import Filter  from '../Filter'

import {useRecentBookings} from '../query/dashboard/useRecentBooking';
import {useRecentStays} from '../query/dashboard/useRecentStays';
import {useGetAllCabins} from '../query/cabins/useGet';
import TodayActivity from '../TodayActivity';
import DurationChart from '../DurationChart';
import SalesChart from '../SalesChart';

const dashboard = () => {
  const {bookings, isLoading: isLoading1} = useRecentBookings();
  const {confirmedStays, isLoading: isLoading2, numDays} = useRecentStays();
  const {cabins, isLoading: isLoading3} = useGetAllCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <h1>Loading...</h1>


  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabins.length)

  return (
    <div className='text-[var(--text-primary)]'>
      <div className='flex justify-between'>
        <h1>Dashboard</h1>
        <Filter 
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" },
        ]}
        />
      </div>

      <div className='pt-6 grid grid-cols-4 gap-2'>
          <>
          <li className='p-4 flex items-center gap-2 bg-[var(--color-block)]'>
            <span className='w-12 text-2xl'>🛎</span>
            <div className='flex flex-col'>
            <span>Bookings</span>
            <span>{numBookings}</span>
            </div>
          </li>

          <li className='p-4 flex items-center gap-2 bg-[var(--color-block)]'>
            <span className='w-12 text-2xl'>💰</span>
            <div className='flex flex-col'>
            <span>Sales</span>
            <span>${sales}</span>
            </div>
          </li>

          <li className='p-4 flex items-center gap-2 bg-[var(--color-block)]'>
            <span className='w-12 text-2xl'>⏱</span>
            <div className='flex flex-col'>
            <span>Check ins</span>
            <span>{checkins}</span>
            </div>
          </li>

          <li className='p-4 flex items-center gap-2 bg-[var(--color-block)]'>
            <span className='w-12 text-2xl'>📈</span>
            <div className='flex flex-col'>
            <span>Occupancy rate</span>
            <span>{Math.round(occupation * 100) + "%"}</span>
            </div>
          </li>
          </>

          <TodayActivity />
          <DurationChart confirmedStays={confirmedStays}/>
          <SalesChart bookings={bookings} numDays={numDays}/>
      </div>
    </div>
  )
}

export default dashboard