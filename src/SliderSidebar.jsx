import React from 'react'

const SliderSidebar = () => {
  return (
    <div className='flex flex-col max-w-[300px] w-full h-full border border-gray-400 text-lg font-medium text-amber-50 max-lg:hidden'>
        <div>
            <h1>Head - Title</h1>
        </div>
        <ul className='flex flex-col gap-4'>
            <li className=''>Link</li>
            <li className=''>Link</li>
            <li className=''>Link</li>
            <li className=''>Link</li>
            <li className=''>Link</li>
        </ul>
        <div>
           <div className='flex gap-4'>
             <button>1</button>
            <button>2</button>
           </div>
            <button>3</button>
        </div>
    </div>
  )
}

const Toggle = () => {
    return (
<div className={`absolute max-w-[300px] w-full h-full border border-gray-400 lg:hidden ${barToggle ? "top-0 -left-0" : "top-0 -left-[300px]"}`}>
            <span onClick={() => setBarToggle(!barToggle)} className='text-2xl text-amber-50 absolute top-1/2 -right-6'>
                ⍃
            </span>
        </div>
    )
}

export default SliderSidebar