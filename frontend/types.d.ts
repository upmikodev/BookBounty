export interface Book {
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
  seller?: string
  seller_name?: string
  seller_location?: string
  status: string
  image: string
}

export interface Listing {
  title: string
  author: string
  description: string
  price: string
  condition: string
  rating?: string
  ISBN?: string
  publication_year?: string
  publisher?: string
  category?: string
  status: string
  image: File | null
}
