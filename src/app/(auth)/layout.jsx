import Logo from '@/components/Logo'
import React from 'react'

export default function layout({children}) {
  return (
    <div className='p-10'>
        <Logo></Logo>
        {children}
    </div>
  )
}
