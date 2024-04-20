'use client'

import { CreditCard, List, LogOut, Settings, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { IsLoggedInContext } from '@/contexts/IsLoggedIn'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/bb.png'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext)
  const router = useRouter()
  // const pathname = usePathname()

  const logout = async () => {
    await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    setIsLoggedIn(false)
    router.push('/')
  }

  const handleOrders = () => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      router.push('/orders')
    }
  }

  const handleListings = () => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      router.push('/listings')
    }
  }

  return (
    <div className="w-full h-24 shadow-lg px-8">
      <div className="max-w-[1500px] mx-auto h-full w-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold">
          <Image src={Logo} alt="BookBounty" className="h-20 w-48" />
        </Link>
        <ul className="flex">
          <Link href="/">
            <li className="px-3 mx-5 text-base">Home</li>
          </Link>
          <li
            onClick={handleOrders}
            className="px-3 mx-5 text-base cursor-pointer"
          >
            My Orders
          </li>
          <li
            onClick={handleListings}
            className="px-3 mx-5 text-base cursor-pointer"
          >
            My Listings
          </li>
        </ul>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="bg-transparent hover:bg-transparent hover:border-none hover:outline-none"
              >
                <User className="text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    href="/profile"
                    className="flex items-center justify-between w-full"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/orders"
                  className="flex items-center justify-between w-full"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/listings"
                  className="flex items-center justify-between w-full"
                >
                  <List className="mr-2 h-4 w-4" />
                  <span>My Listings</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-center">
            <Button className="mx-2 bg-theme hover:bg-theme/95" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button className="mx-2 bg-theme hover:bg-theme/95" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
