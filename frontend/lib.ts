export function getCSRFToken() {
  let csrfToken = null
  if (document.cookie) {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=')
      if (key === 'csrftoken') {
        csrfToken = value
        break
      }
    }
  }
  return csrfToken
}

export function convertImageUrl(url: string): string {
  if (url.startsWith('/books/')) {
    return `http://127.0.0.1:8000${url}`
  }
  return url.replace('/http%3A/', 'https://')
}

export function getTodaysDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
