'use client'

import { setUser } from "@/redux/authSlice"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)

      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
        })

        if (!res.ok) {
          const error = await res.json()
          toast.error(error.message || 'Login failed')
          console.log('Could not log in.')
        } else {
          const data = await res.json()
          dispatch(setUser(data.user)) // Dispatch the user data to redux for state management
          toast.success(`Logged in successfully.`)
          router.push('/')
        }
      } catch (error) {
        console.error('Error in login', error)
        toast.error(`${error}`)
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <div className="min-h-screen flex">
      <div className="w-[80%] p-4 m-auto max-w-[450px]">
        <h1 className="text-2xl text-center font-bold">Log in</h1>
        <form onSubmit={handleSubmit} className="my-2 flex flex-col gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="py-2 px-3 border"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="py-2 px-3 border"
            required
          />
          <Link className="text-blue-700" href={'/authentication/forgot-pass'}>forgot password?</Link>
          <button disabled={isLoading} className={`py-2 px-3 bg-black text-white hover:rounded-md hover:bg-gray-900 ${isLoading && 'cursor-not-allowed bg-gray-800'}`}> {isLoading ? 'Authenticating...' : 'Log in'} </button>
          <div className="flex items-center justify-start">
            <Link href={'/authentication/admin/login'} className="group cursor-pointer opacity-80 hover:opacity-100">Login as admin 
              <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">{` >`}</span>
              <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-500">{`>`}</span>
              <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-700">{`>`}</span>
            </Link>
          </div>
          <p className="text-center">Do not have account? 
            <Link href={'/authentication/signup'} className="text-blue-600"> Sign up</Link>
          </p>
          
        </form>
      </div>
    </div>
  )
}

export default LoginPage