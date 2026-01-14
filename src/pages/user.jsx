import React from 'react'
import SignUp from "../SignUp"
import UsersTable from '../components/UsersTable';
import TableCaption from "../components/UsersCaption"

const user = () => {

  return (
    <>
      <TableCaption />
      {/* <SignUp /> */}
      <UsersTable />
    </>
  )
}

export default user