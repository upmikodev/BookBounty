'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { convertImageUrl, getTodaysDate } from '@/lib'
import { Book } from '@/types'
import {
  Building2,
  CalendarFold,
  MapPin,
  MessageSquare,
  ScanBarcode,
  Truck,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  params: {
    id: number
  }
}

const page = ({ params: { id } }: Props) => {
  const [bookDetails, setBookDetails] = useState<Book | null>(null)
  const [location, setLocation] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    postal_code: '',
    state: '',
    country: '',
  })
  //   const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const fetchBookDetails = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/books/${id}`)
      const data = await res.json()
      setBookDetails(data)
      //   setPrice(data.price)
    }
    fetchBookDetails()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:8000/api/makeorder/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: getTodaysDate(),
        quantity: qty,
        book_id: bookDetails?.book_id,
        payment_method: 'COD',
        shipping_address: location,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      alert('Order Placed Successfully')
    } else {
      alert('Order Failed')
    }
  }

  const qtyDec = (e: React.MouseEvent) => {
    e.preventDefault()
    if (qty > 1) {
      setQty((prev) => prev - 1)
    }
  }

  const qtyInc = (e: React.MouseEvent) => {
    e.preventDefault()
    setQty((prev) => prev + 1)
  }

  if (bookDetails === null) return <div>Loading...</div>
  return (
    <div className="w-full lg:h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="h-full flex flex-col lg:flex-row lg:py-10">
        {/* Image and Category  */}
        <div className="w-full lg:w-1/5 flex flex-col items-start justify-start">
          <div className="flex w-full items-center justify-center">
            <img
              src={convertImageUrl(bookDetails.image)}
              alt={bookDetails.title}
              className="w-[80%] rounded"
            />
          </div>
          <div className="flex flex-col px-5">
            <p className="mt-3 font-semibold">Genre:</p>
            <p>{bookDetails.category}</p>
          </div>
        </div>
        {/* Book Names and other Details  */}
        <div className="w-full lg:w-3/5 flex flex-col items-start justify-start px-3 ">
          <div className="flex mb-2">
            <p className="px-3 py-2 bg-gray-200 rounded-lg">
              {bookDetails.condition}
            </p>
            <p
              className={`${
                bookDetails.status === 'Available'
                  ? 'text-green-500'
                  : 'text-purple-500'
              } px-3 py-2 mx-2 bg-gray-200 rounded-lg`}
            >
              {bookDetails.status}
            </p>
          </div>
          <h1 className="text-3xl font-semibold my-1">{bookDetails.title}</h1>
          <p className="text-lg my-1">
            <span className="font-semibold">by</span> {bookDetails.author}
          </p>

          <div className="flex items-center justify-center gap-5 my-4">
            <p className="text-yellow-500 flex items-center justify-center text-lg">
              ★ {bookDetails.rating}
            </p>
            <p className=" flex items-center justify-center text-lg">
              <MessageSquare size={20} className="mx-1" /> 0 Book Reviews
            </p>
          </div>

          <p className="text-lg">
            Sold by {bookDetails.seller_name}
            {', '}
            {bookDetails.seller_location}
          </p>
          <div className="h-px w-full bg-gray-200 my-4"></div>

          <h1 className="text-2xl font-semibold">Synopsis</h1>
          <p className="my-3">{bookDetails.description}</p>
          <div className="h-px w-full bg-gray-200 my-4"></div>

          <h1 className="text-2xl font-semibold">Other Info</h1>

          <div className="flex my-4">
            <div className="bg-gray-200 rounded-md h-32 w-32 mx-2 flex flex-col items-center justify-center text-center text-sm">
              <p className="font-semibold">Publisher:</p>
              <Building2 size={35} className="my-2" />
              <p>{bookDetails.publisher}</p>
            </div>
            <div className="bg-gray-200 rounded-md h-32 w-32 mx-2 flex flex-col items-center justify-center text-center text-sm">
              <p className="font-semibold">Published on:</p>
              <CalendarFold size={35} className="my-2" />
              <p>{bookDetails.publication_year}</p>
            </div>
            <div className="bg-gray-200 rounded-md h-32 w-32 mx-2 flex flex-col items-center justify-center text-center text-sm">
              <p className="font-semibold">ISBN:</p>
              <ScanBarcode size={35} className="my-2" />
              <p>{bookDetails.ISBN}</p>
            </div>
          </div>
        </div>
        {/* Checkout Info  */}
        <div className="w-full lg:w-1/5 flex items-start justify-center">
          <form
            onSubmit={submit}
            className="border rounded-lg shadow-lg w-full flex flex-col justify-start px-2 py-6"
          >
            <h1 className="text-lg font-semibold">Checkout Details</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
              <Label htmlFor="location" className="flex">
                Address
              </Label>
              <Input
                type="text"
                id="location"
                className="focus:border-none focus:outline-none text-sm"
                placeholder="Kalanki Mandir Chowk"
                required
                onChange={(e) =>
                  setLocation({ ...location, address_line_1: e.target.value })
                }
              />
            </div>
            <div className="flex gap-x-1">
              <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                <Label htmlFor="location" className="flex">
                  City
                </Label>
                <Input
                  type="text"
                  id="location"
                  className="focus:border-none focus:outline-none text-sm"
                  placeholder="Kathmandu"
                  required
                  onChange={(e) =>
                    setLocation({ ...location, city: e.target.value })
                  }
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                <Label htmlFor="location" className="flex">
                  Postal Code
                </Label>
                <Input
                  type="text"
                  id="location"
                  className="focus:border-none focus:outline-none text-sm"
                  placeholder="44600"
                  required
                  onChange={(e) =>
                    setLocation({ ...location, postal_code: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-x-1">
              <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                <Label htmlFor="location" className="flex">
                  State
                </Label>
                <Input
                  type="text"
                  id="location"
                  className="focus:border-none focus:outline-none text-sm"
                  placeholder="Bagmati"
                  required
                  onChange={(e) =>
                    setLocation({ ...location, state: e.target.value })
                  }
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                <Label htmlFor="location" className="flex">
                  Country
                </Label>
                <Input
                  type="text"
                  id="location"
                  className="focus:border-none focus:outline-none text-sm"
                  placeholder="Nepal"
                  required
                  onChange={(e) =>
                    setLocation({ ...location, country: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
              <Label htmlFor="delivery" className="flex text-base items-center">
                <Truck size={15} className="mx-1" />
                Delivery Within
              </Label>
              <p className="text-sm px-6">3-5 days</p>
            </div>
            <div className="h-px w-full bg-gray-200 my-2"></div>

            <p className="text-lg font-semibold mx-1">
              ${Math.ceil(+bookDetails.price * qty)}
            </p>

            <div className="flex justify-around items-center bg-gray-200 rounded-md w-full py-3 my-2">
              <button
                onClick={qtyDec}
                className="bg-white p-3 rounded-full w-14 h-14 text-2xl"
              >
                -
              </button>
              <p>
                <span className="font-semibold">QTY:</span> {qty}
              </p>
              <button
                onClick={qtyInc}
                className="bg-white p-3 rounded-full w-14 h-14 text-2xl"
              >
                +
              </button>
            </div>

            <p className="text-xs italic">Only Cash on Delivery is available</p>

            <Button
              className="my-4 w-full bg-theme hover:bg-theme/95 uppercase"
              type="submit"
            >
              Buy Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
