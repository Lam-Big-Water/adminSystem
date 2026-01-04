import React from 'react'
import BookingTable from '../components/BookingTable'
// import BookingTableOperations from '../BookingTableOperations'
import BookingTableOperations from '../components/BookingTableOperations'

import Pagination from "../Pagination";
import { useBookings } from "../query/bookings/useBookings";
import BookingTableCaption from '../components/BookingTableCaption';

const bookings = () => {
  const { count } = useBookings();

  return (
    <div className="">
      <BookingTableCaption />
      <BookingTableOperations />
      <BookingTable />
      <Pagination count={count}/>
    </div>
  )
}

export default bookings