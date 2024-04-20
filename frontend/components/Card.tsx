'use client'
import { Button } from './ui/button'
import { convertImageUrl } from '@/lib'
import { Book } from '@/types'
import { useRouter } from 'next/navigation'

interface BookCardProps {
  book: Book
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter()

  const imageUrl = convertImageUrl(book.image)

  const openBookPage = () => {
    router.push(`/books/${book.book_id}`)
  }

  return (
    <div
      onClick={openBookPage}
      className="w-72 m-4 flex flex-col justify-center items-center shadow-md border py-4 rounded-lg"
    >
      <img
        className="h-64 w-40 object-cover border-[0.1px] border-black rounded"
        src={imageUrl}
        alt={book.title}
        // height={1000}
        // width={1000}
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
          <Button className="bg-theme hover:bg-theme/95 w-full text-white font-bold py-2 px-4 rounded">
            Buy
          </Button>
        </div>
      </div>
    </div>
  )
}
export default BookCard
