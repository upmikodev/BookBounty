import books from '@/jsons/books.json'
import BookCard from '@/components/Card'
import Image from 'next/image'
import Banner1 from '@/public/banner1.png'
import Banner2 from '@/public/banner2.png'

const BookList = () => {
  return (
    <div className="max-w-[1600px]">
      <div className="my-3">
        <Image src={Banner2} alt="" className="rounded-lg" />
      </div>
      <h1 className="text-4xl my-5 font-semibold w-full px-5">
        Recommended for you
      </h1>
      <div className="flex flex-wrap justify-center">
        {books.map((book) => (
          <BookCard key={book.book_id} book={book} />
        ))}
      </div>
      <div className="my-3">
        <Image src={Banner1} alt="" className="rounded-lg" />
      </div>
    </div>
  )
}

export default BookList
