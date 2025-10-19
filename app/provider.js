import { Toaster } from '@/components/ui/sonner'
import React from 'react'

const Provider = ({children}) => {
  return (
    <> 
        <Toaster position='bottom-center' closeButton/>
        {children}
    </>
  )
}

export default Provider