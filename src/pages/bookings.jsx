import React from 'react'
import BookingTable from '../BookingTable'
import BookingTableOperations from '../BookingTableOperations'
import Pagination from "../Pagination";
import { useBookings } from "../query/bookings/useBookings";

const bookings = () => {
  const { count } = useBookings();

  return (
    <div className="">
      <BookingTableOperations />
      <BookingTable />
      <Pagination count={count}/>
    </div>
  )
}

export default bookings