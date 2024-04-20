'use client'
import { createContext, useState, ReactNode, useEffect } from 'react'

export const IsLoggedInContext = createContext<
  [boolean, (isLoggedIn: boolean) => void]
>([false, () => {}])

interface CustomProviderProps {
  children: ReactNode
}

export const CustomProvider: React.FC<CustomProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        credentials: 'include',
      })
      const data = await response.json()
      if (!data.detail) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })()
  }, [isLoggedIn])

  return (
    <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </IsLoggedInContext.Provider>
  )
}
