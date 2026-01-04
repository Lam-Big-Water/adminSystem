import React from 'react'
import BookingTable from '../components/BookingTable'
// import BookingTableOperations from '../BookingTableOperations'
import BookingTableOperations from '../components/BookingTableOperations'

// import Pagination from "../Pagination";
import BookingTableCaption from '../components/BookingTableCaption';

const bookings = () => {

  return (
    <div className="">
      <BookingTableCaption />
      <BookingTableOperations />
      <BookingTable />
    </div>
  )
}

export default bookings