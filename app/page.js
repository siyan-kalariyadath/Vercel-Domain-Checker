"use client"
import Footer from '@/components/main/footer'
import Header from '@/components/main/header'
import SearchForm from '@/components/main/search-form'
import React from 'react'

const page = () => {
  return (
    <div className='w-full max-h-screen bg-background relative overflow-hidden'>
      <Header/>
      <SearchForm/>
      <Footer/>
    </div>
  )
}

export default page