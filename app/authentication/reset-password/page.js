"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"


const ResetPassword = () => {
  const searchParams = useSearchParams() // Get the email search param from the url
  const router = useRouter()

  const email = searchParams.get('email')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Ensure the two password match
    if (password !== confirmPassword) {
      setLoading(false)
      return toast.error('Password must match. Try again.')
    }

    try {
      const res = await fetch(`/api/auth/reset-password?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      
      if (res.ok) {
        toast.success(`${data.message}`)
        router.push('/authentication/login')
      } else {
        toast.error(`${data.message}`)
      }
    } catch (error) {
      console.error('Error resetting password:', error)
    }  finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
    <h1 className="text-center text-3xl font-bold my-4">Reset password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[450px] m-auto">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className="px-3 py-2 border"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          className="px-3 py-2 border"
        />
        <button disabled={loading} className={`px-3 py-2 bg-black hover:bg-gray-800 text-white ${loading ? 'hover:bg-gray-700 cursor-not-allowed' : ''}`}>
          {loading ? (
            <span className="animate-pulse">Resetting...</span>
          ) : (
            <span>Reset</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword