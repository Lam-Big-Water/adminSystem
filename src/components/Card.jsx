import React from 'react'
const Card = ({icon, income = 9, rate = 20, title = "test"}) => {
  return (
    <div className='flex flex-col gap-6 p-6 bg-card text-card-foreground shadow-sm border border-border rounded-xl'>
        <div className='flex items-center justify-between gap-1.5'>
            <h3 className='text-sm font-medium'>{title}</h3>
            <div className='w-4 h-4 text-muted-foreground'>{icon}</div>
        </div>

        <div className=''>
            <div className='text-2xl font-bold'>{income}</div>
            <p className='text-xs text-muted-foreground'>{rate} from last month</p>
        </div>
    </div>
  )
}

export default Card