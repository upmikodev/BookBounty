'use client'
import { User } from '@/types'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    email: '',
    name: '',
    username: '',
    location: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch('http://127.0.0.1:8000/api/user', {
        credentials: 'include',
      })
      const data = await res.json()
      setUser(data)
    }
    fetchUserData()
  }, [])

  return (
    <div className="max-w-xs mx-auto bg-white overflow-hidden md:max-w-md my-10">
      <div className="md:flex md:flex-col">
        <div className="w-full">
          <img 
            src="https://th.bing.com/th/id/R.566e17f052cbf8e9ddb02a42e95c20d1?rik=gbqGewtNwYCI1A&riu=http%3a%2f%2fadharshillaconventschool.com%2fbackend%2fthemes%2f4%2fimages%2fdefault_user.jpg&ehk=V9vPVOBbqlT0MR22FQXw%2fyzIP4A0ed3vnoP1tK2k7Ow%3d&risl=&pid=ImgRaw&r=0" 
            alt="Profile" 
            className="object-cover object-center w-full h-96 rounded-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-gray-800"><span className='font-semibold'>Name:</span> {' '}{user.name}</h2>
          <p className="text-gray-800"><span className='font-semibold'>Email:</span> {' '}{user.email}</p>
          <div className="mt-2">
            <p className="text-gray-800"><span className="font-bold">Username:</span> {user.username}</p>
            <p className="text-gray-800"><span className="font-bold">Location:</span> {user.location}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-800"><span className="font-bold">ID:</span> {user.id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
