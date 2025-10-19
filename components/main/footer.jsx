"use client";
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full h-fit'>
        <div className="max-w-7xl mx-auto w-full flex justify-center items-center text-sm h-16">
            <p className='font-sans tracking-tight dark:text-neutral-500'>Developed By <Link href={"/"} className='hover:underline hover:underline-offset-4 hover:text-foreground'>Siyan Kalariyadath</Link></p>
        </div>
    </footer>
  )
}

export default Footer