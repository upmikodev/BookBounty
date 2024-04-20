'use client'
import React from 'react'
import { Book } from '@/types'
import { convertImageUrl } from '@/lib'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const ListingsPage = () => {
  interface BookCardProps {
    book: Book
  }

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/userlistings/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await response.json()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  return (
    <div className="p-16">
      <div className="w-full flex items-center justify-between px-24">
        <h1 className="mb-6 text-3xl font-bold">Your Listings</h1>
        <Button className=" bg-theme hover:bg-theme/95" asChild>
          <Link href="/listings/create">Create</Link>
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {books.map((book) => (
          <div className="w-72 m-4 flex flex-col justify-center items-center shadow-md border py-4 rounded-lg">
            <img
              className="h-64 w-40 object-cover border-[0.1px] border-black rounded"
              src={convertImageUrl(book.image)}
              alt={book.title}
            />
            <div className="px-6 py-4 w-full">
              <div className="font-bold text-base mb-2 line-clamp-1">
                {book.title}
              </div>
              <p className="text-gray-700 text-sm mb-2 line-clamp-1">
                <span className="font-bold">by </span>
                {book.author}
              </p>
              <p className="text-gray-900 text-base mb-2">${book.price}</p>
              <div>
                <p
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 capitalize dark:focus:ring-blue-800 ${
                    book.status === 'order received'
                      ? 'bg-green-500'
                      : 'bg-theme'
                  }`}
                >
                  {book.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListingsPage
