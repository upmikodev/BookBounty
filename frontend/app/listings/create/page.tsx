'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import { Listing } from '@/types'

const page = () => {
  const [bookData, setBookData] = useState<Listing>({
    title: '',
    author: '',
    description: '',
    price: '',
    condition: '',
    rating: '',
    ISBN: '',
    publication_year: '',
    publisher: '',
    category: '',
    status: '',
    image: null,
  })

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault() // Prevent default form submission behavior

    const formData = new FormData()
    formData.append('title', bookData.title ?? '') // Use the nullish coalescing operator to default to an empty string if undefined
    formData.append('author', bookData.author ?? '')
    formData.append('description', bookData.description ?? '')
    formData.append('price', bookData.price ?? '')
    formData.append('condition', bookData.condition ?? '')
    formData.append('rating', bookData.rating ?? '')
    formData.append('ISBN', bookData.ISBN ?? '')
    formData.append('publication_year', bookData.publication_year ?? '')
    formData.append('publisher', bookData.publisher ?? '')
    formData.append('category', bookData.category ?? '')
    formData.append('status', bookData.status ?? '')
    if (bookData.image) {
      formData.append('image', bookData.image)
    }

    const res = await fetch('http://127.0.0.1:8000/api/books/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    const data = await res.json()
    console.log('listing ko data: ', data)

    if (res.ok) {
      alert('Book listed successfully')
    } else {
      alert('Failed to list book')
    }
  }
  return (
    <div>
      <form
        onSubmit={submit}
        className="text-black max-w-[1240px] mx-auto flex flex-col items-center justify-center"
      >
        <h1 className="my-4 text-2xl font-bold">List a book</h1>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, title: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            id="author"
            placeholder="Author of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, author: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            placeholder="Short Description of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, description: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="price">Price</Label>
          <Input
            type="text"
            id="price"
            placeholder="Price of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, price: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="condition">Condition</Label>
          <Input
            type="text"
            id="condition"
            placeholder="Condition of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, condition: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="rating">Rating</Label>
          <Input
            type="text"
            id="rating"
            placeholder="Rating of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, rating: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            type="text"
            id="isbn"
            placeholder="ISBN of the book"
            required
            onChange={(e) => {
              setBookData({ ...bookData, ISBN: e.target.value })
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="pd">Publication Date</Label>
          <Input type="text" id="pd" placeholder="YYYY-MM-DD" required />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            id="category"
            placeholder="Category of the book"
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            required
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setBookData({ ...bookData, image: e.target.files[0] })
              } else {
                setBookData({ ...bookData, image: null }) // Optionally reset the image field if no file is selected
              }
            }}
          />
        </div>

        <Button className="my-4 w-96 bg-theme hover:bg-theme/95" type="submit">
          List the book
        </Button>

        <p className="text-[13px] text-muted-foreground my-2">
          By listing a book, I accept the{' '}
          <Link href="/terms" className="underline">
            Terms and Condition
          </Link>
        </p>
      </form>
    </div>
  )
}

export default page
