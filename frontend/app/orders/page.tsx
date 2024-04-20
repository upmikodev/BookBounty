'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { convertImageUrl } from '@/lib'
const OrdersPage = () => {
  interface Book {
    book_id: number
    title: string
    author: string
    description: string
    price: string
    condition: string
    rating: string
    ISBN: string
    publication_year: string
    publisher: string
    category: string
    seller_name: string
    seller_location: string
    image: string
    status: string
  }
  interface Order {
    transaction_id: number
    date: string
    price: number
    book_id: number
    payment_method: string
    quantity: number
  }
  const [orders, setOrders] = useState<Order[]>([])
  const [books, setBooks] = useState<Book[]>([])

  const fetchOrders = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/userorders/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const ordersData = await res.json()
    setOrders(ordersData)

    const bookPromises = ordersData.map(async (order: Order) => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/books/${order.book_id}`
      )
      const book: Book = await res.json()
      return book
    })

    const books = await Promise.all(bookPromises)
    setBooks(books)
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  return (
    <div className="p-16">
      <h1 className="mb-6 text-3xl font-bold">Your Orders</h1>
      <div className="flex flex-wrap gap-8">
        {books.map((book, index) => {
          const order = orders[index]
          const k = book.book_id + Math.random()
          return (
            <div
              key={k}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#" className="flex justify-center">
                <img
                  className="rounded-t-lg h-60"
                  src={convertImageUrl(book.image)}
                  alt={book.title}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {book.title}
                  </h5>
                </a>
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                  Price: ${book.price}
                </p>
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                  Quantity: {order.quantity}
                </p>
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                  Payment Method: {order.payment_method}
                </p>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                  Order Date: {order.date}
                </p>
                <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Out for delivery
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrdersPage
