import React from 'react'
import SettingCaption from "../components/SettingCaption"
import SettingNav from '../components/SettingNav'
import { Outlet } from 'react-router-dom'

const Settings = () => {
  return (
    <div>
        <SettingCaption />

        <div className='flex flex-col gap-4 lg:flex-row sm:flex-col'>
          <SettingNav />
          <Outlet />
        </div>

    </div>
  )
}

export default Settings