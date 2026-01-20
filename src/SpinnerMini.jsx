import React from 'react'
import { LoaderCircle } from 'lucide-react';


const SpinnerMini = () => {
  return (
    <>
        <LoaderCircle size={20} strokeWidth={2} className="animate-spin"/>
    </>
  )
}

export default SpinnerMini