'use client'

import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/forgot-pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applciation/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json()
            if (res.ok) {
                toast.success('Password recovery email sent successfully')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error in password recovery:', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="">
        <h1 className="text-3xl font-bold text-center mb-4">Password recovery</h1>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-[450px] w-[80%] gap-2 m-auto">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="py-2 px-3 border"
            />
            <button 
                disabled={ loading } 
                className={`bg-black ${loading && 'cursor-not-allowed bg-gray-700 hover:bg-gray-700'} text-white hover:bg-gray-800 py-2 px-3`}
            >
                { loading ? 'Submitting...' : 'Submit'}
            </button>
            <p>
                Back to <Link href={'/authentication/login'}><span className="text-blue-700">Login</span></Link>
            </p>
        </form>
    </div>
  )
}

export default ForgotPassword