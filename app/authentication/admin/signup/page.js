'use client'
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
      const data = await res.json()

      if (!res.ok) {
        console.log(`Could not register: ${data.message}`)
        toast.error(`${data.message}`)
      } else {
        toast.success(`${data.message}`)
      }
    } catch (error) {
      console.error('Error signing up:', error)
      toast.error(`${data.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
    <div className="w-[80%] p-4 m-auto max-w-[450px]">
      <h1 className="text-2xl text-center font-bold">Resigter</h1>
      <form onSubmit={handleSubmit} className="my-2 flex flex-col gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin username"
          className="py-2 px-3 border"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
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
        <button 
          disabled={isLoading} 
          className={`py-2 px-3 bg-black text-white hover:rounded-md hover:bg-gray-900 
          ${isLoading && 'cursor-not-allowed bg-gray-800'}`}
        > 
          {isLoading ? (
            <span className="animate-pulse" aria-live="polite">Processing...</span>
          ) : ( 
            <span> Sign up</span>
          )}
        </button>
        <p className="text-center">Back to? 
          <Link href={'/authentication/admin/login'} className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
    </div>
  )
}

export default SignupPage