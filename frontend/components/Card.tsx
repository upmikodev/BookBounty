import { Button } from "./ui/button"

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
  seller: string
  status: string
  image: string
}

interface BookCardProps {
  book: Book
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="w-96 rounded-lg overflow-hidden shadow-lg m-4 flex flex-col justify-center items-center">
      <img
        className="h-64 object-cover"
        src={book.image}
        alt={book.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
        <p className="text-gray-700 text-base mb-2"><span className="font-bold">Author:{' '}</span>{book.author}</p>
        <p className="text-gray-900 text-xl mb-2">${book.price}</p>
        <div>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
          Buy
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-1">
          Details
        </Button>
        </div>
      </div>
    </div>
  )
}
export default BookCard
