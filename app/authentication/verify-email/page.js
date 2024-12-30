'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const VerifyPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verificationToken = searchParams.get('token') // Extract the token from the URL searchParams
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const verifyEmial = async () => {
      if (!verificationToken) return // Exit if not token is found
      
      try {
        setIsLoading(true)
        // Make an API request with the verification token
        const res = await fetch(`/api/auth/verify-email?token=${verificationToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json()
        if (res.ok) {
          toast.success(`${data.message}`)
          router.push('/authentication/login')
        } else {
          toast.error(`${data.message}`)
        }
      } catch (error) {
        console.error('Error verifying email:', error)
        toast.error(`${data.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmial()
  }, [verificationToken])

  return (
    <div className="min-h-screen flex">
      <p className={`${isLoading && 'animate-pulse'} m-auto font-bold text-2xl`}>{isLoading ? 'Verifying email...' : ''}</p>
      {/* <p className={`${sucess && 'animate-pulse'} m-auto font-bold text-2xl`}>{sucess && 'Redirecting...'}</p> */}
    </div>
  )
}

export default VerifyPassword