'use client'
import { IsLoggedInContext } from '@/contexts/IsLoggedIn'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext)

  const logout = async () => {
    await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    setIsLoggedIn(false)
  }

  return (
    <div className="flex w-full justify-between items-center h-24 shadow-lg px-8">
      <Link href='/' className="text-2xl font-extrabold">Book Bounty</Link>
      <ul className="flex">
        <li className='px-2 mx-2'>Home</li>
        <li className='px-2 mx-2'>About</li>
        <li className='px-2 mx-2'>Contact</li>
      </ul>
      {isLoggedIn ? (
        <Button onClick={logout}>Log out</Button>
      ) : (
        <div className='flex items-center justify-center'>
          <Button className='mx-2' asChild><Link href='/login'>Log in</Link></Button>
          <Button className='mx-2' asChild><Link href='/register'>Register</Link></Button>
        </div>
      )}
    </div>
  )
}
