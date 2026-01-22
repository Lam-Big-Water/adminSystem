import React from 'react'
import SignUp from "../SignUp"
import UsersTable from '../components/UsersTable';
import TableCaption from "../components/UsersCaption"

const user = () => {

  return (
    <div className='py-6 px-4 max-w-7xl w-full mx-auto'>
      <TableCaption />
      {/* <SignUp /> */}
      <UsersTable />
    </div>
  )
}

export default user