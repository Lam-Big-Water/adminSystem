import FocusLock from 'react-focus-lock';

const Dialog = ({onCloseModal}) => {
  return (
    <FocusLock>
    <div className='fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg flex flex-col gap-4 bg-white text-indigo-950 font-medium rounded-2xl shadow-lg p-6 max-sm:w-full'>
        <div className='flex flex-col gap-2 text-start'>
            <h2 className='text-lg leading-none font-semibold'>Add New</h2>
            <p className='text-sm text-zinc-400'>Create new user here. Click save when you're done.</p>
        </div>

        <div className='h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
            <form className='space-y-4 px-0.5'>
                <div className='grid grid-cols-6 gap-2 items-center space-y-0 gap-x-4 gap-y-1 max-sm:grid-cols-1 max-sm:items-start max-sm:gap-2'>
                    <label htmlFor="name" className='text-sm leading-none select-none col-span-2 max-sm:w-full'>Name</label>
                    <input id='name' type="text" className='w-full h-9 min-w-0 px-3 py-1 text-base shadow-xs border border-zinc-400 rounded-md col-span-4 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-zinc-400 placeholder:text-zinc-400 max-sm:w-full'/>
                </div>

                <div className='grid grid-cols-6 gap-2 items-center space-y-0 gap-x-4 gap-y-1 max-sm:grid-cols-1 max-sm:items-start max-sm:gap-2'>
                    <label htmlFor="photo" className='text-sm leading-none select-none col-span-2 max-sm:w-full'>Photo</label>
                    <input id='photo' type="file" className='w-full h-9 min-w-0 px-3 py-1 text-base shadow-xs border border-zinc-400 rounded-md col-span-4 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-zinc-400 placeholder:text-zinc-400 max-sm:w-full'/>
                </div>
            </form>
        </div>

        <div className='w-full'>
            <button className='cursor-pointer block w-full px-4 py-2 bg-zinc-950 text-white rounded-md hover:bg-zinc-950/90'>Save Change</button>
        </div>

        <button onClick={() => onCloseModal?.()} className='cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-zinc-700'>✕</button>
    </div>
    </FocusLock>
  )
}

export default Dialog