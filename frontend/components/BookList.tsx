'use client'
import { useContext, useEffect, useState } from 'react'
import books from '@/jsons/books.json'
import serverbooks from '@/jsons/serverbooks.json'
import BookCard from '@/components/Card'
import Image from 'next/image'
import Banner1 from '@/public/banner1.png'
import Banner2 from '@/public/banner2.png'
import { IsLoggedInContext } from '@/contexts/IsLoggedIn'
import { Book } from '@/types'

const BookList = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext)
  const [booksFromServer, setBooksFromServer] = useState<Book[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/books/', {
          method: 'GET',
        })
        const data = await response.json()
        setBooksFromServer(data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchData()
  }, [isLoggedIn])

  // async function fetchBooks() {
  //   const res = await fetch('http://127.0.0.1:8000/api/books')
  //   const data = await res.json()
  //   return data
  // }

  return (
    <div className="max-w-[1600px]">
      <div>
        <Image src={Banner2} alt="" />
      </div>
      <div className={`${!isLoggedIn ? 'hidden' : 'flex flex-col'}`}>
        <h1 className="text-4xl my-5 font-semibold w-full px-5">
          Recommended for you
        </h1>
        <div className="flex flex-wrap justify-center">
          {books.map((book) => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </div>
      </div>
      <div className="my-3">
        <Image src={Banner1} alt="" className="rounded-lg" />
      </div>

      <div>
        <h1 className="text-4xl my-5 font-semibold w-full px-5">All books</h1>
        <div className="flex flex-wrap justify-center">
          {booksFromServer === null ? (
            'Loading...'
          ) : (
            <div className="flex flex-wrap justify-center">
              {booksFromServer.map((book) => {
                return <BookCard key={book.book_id} book={book} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookList
