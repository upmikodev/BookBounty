import books from '@/jsons/books.json';
import BookCard from '@/components/Card';

const BookList = () => {
  return (
    <>
    <h1 className='text-4xl my-7 font-extrabold w-full text-center'>Buy your favorite read</h1>
    <div className="flex flex-wrap justify-center">
      {books.map((book) => (
        <BookCard key={book.book_id} book={book} />
      ))}
    </div>
    </>
  )
}

export default BookList
