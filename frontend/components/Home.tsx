'use client'
import React, { useContext, useEffect, useState } from 'react'
import { IsLoggedInContext } from '@/contexts/IsLoggedIn'
import dynamic from "next/dynamic";
import BookList from '@/components/BookList';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext)

  return (
    <>
      <div className='flex items-center justify-center'><BookList /></div>
    </>
  )
}
export default dynamic (() => Promise.resolve(Home), {ssr: false})

