'use client'
import React, { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Register = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')

  const router = useRouter()

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        location,
      }),
    })
    const data: { [key: string]: string[] } = await res.json()
    console.log('res (Registration): ', res)
    console.log('data (Registration): ', data)

    if (res.ok) {
      await router.push('/login')
      setMessage('Registration successful')
      setRegistrationSuccess(true)
    } else {
      const msg: string = Object.values(data)[0][0]
      setMessage(msg)
      await router.push('/register')
    }
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <form
        onSubmit={submit}
        className="text-black border rounded-2xl shadow-xl w-[35%] h-[750px] flex flex-col items-center justify-center"
      >
        <h1 className="my-4 text-2xl font-bold">Register</h1>

        <h3
          className={`${
            registrationSuccess ? 'text-green-500' : 'text-red-500'
          } capitalize`}
        >
          {message}
        </h3>

        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Location</Label>
          <Input
            type="text"
            id="location"
            placeholder="Location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button className="my-4 w-96 bg-theme hover:bg-theme/95" type="submit">
          Register
        </Button>

        <p className="text-[13px] text-muted-foreground my-2">
          By creating an account I accept the{' '}
          <Link href="/terms" className="underline">
            Terms and Condition
          </Link>
        </p>

        <p className="my-2">
          Already have an account?{' '}
          <Link href="/login" className="text-theme">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
