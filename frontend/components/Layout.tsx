'use client'
import React, { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCSRFToken } from '@/lib'
import { IsLoggedInContext } from '@/contexts/IsLoggedIn'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const router = useRouter()
  const csrfToken = getCSRFToken()
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext)

  const logout = async () => {
    await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken! },
      credentials: 'include',
    })

    setIsLoggedIn(false)
    await router.push('/login')
    
  }

  let menu

  if (!isLoggedIn) {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link href="/login">
            <span className="nav-link active">Login</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/register">
            <span className="nav-link active">Register</span>
          </Link>
        </li>
      </ul>
    )
  } else {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link href="#" className="nav-link active" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
          crossOrigin="anonymous"
        />
      </Head>

      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link href="/">
            <span className="navbar-brand">Home</span>
          </Link>

          <div>{menu}</div>
        </div>
      </nav>

      <main className="form-signin">{props.children}</main>
    </>
  )
}

export default Layout
