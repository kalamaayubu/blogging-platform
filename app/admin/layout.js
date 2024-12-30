'use client'

import { faBars, faBlog, faGaugeHigh, faGear, faPlus, faUserShield } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"


const AdminLayout = ({ children }) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const handleMenuClick = () => {
        setMenuVisible(prev => !prev)
    }

    const toggleProfile = () => {
      setIsProfileOpen(prev => !prev)
    }

    const handleLogout = async () => {
        try {
          const res = await fetch('/api/auth/logout', {
            method: 'POST'
          })
          if (res.ok) {
            toast.success('Logged out successfuly')
            router.push('/authentication/admin/login')
          }
        } catch (error) {
          console.error('Error in logout:', error)
        }
    }

  return (
    <div className="overflow-hidden h-screen ">
        <header className="flex justify-between p-4 shadow-md">
          <div className="flex items-center justify-between gap-6 sm:gap-7 md:gap-8 lg:gap-9 2xl:gap-10">
            <span>🔓unlocKod</span>
            <FontAwesomeIcon 
              onClick={handleMenuClick}
              icon={faBars} 
              className="cursor-pointer"
            />
          </div>
          <div className="flex gap-4 justify-between items-center">
            <div className="relative flex">
              <div onClick={toggleProfile} className="size-7 lg:size-8 rounded-full">
                <img src="/uploads/gym.jpg" alt="Image" className="object-cover w-full h-full rounded-full cursor-pointer"/>
              </div>
              <div className={`absolute z-10 flex flex-col gap-2 right-0 top-8 lg:top-9 bg-violet-100 transition-all duration-500 p-4 ${isProfileOpen ? 'translate-x-0 opacity-100' : 'opacity-0 translate-x-40'}`}>
                <p className="cursor-pointer">Profile</p>
                <button onClick={handleLogout} className="bg-violet-900 rounded-full hover:bg-violet-800 text-white py-2 px-5 cursor-pointer">Logout</button>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex w-screen relative">
          <nav className={`bg-violet-50 min-h-screen overflow-y-auto flex flex-col gap-4 p-4 ${menuVisible ? 'translate-x-0 opacity-95' : '-translate-x-40 w-0 opacity-5'} transition-all z-20 min-w-[190px] duration-500 group-hover:`}>
              <Link href={'/admin/create-blog'} className="flex group flex-row items-center">
              <FontAwesomeIcon
                  icon={faPlus} 
                  className="cursor-pointer scale-90 group-hover:scale-95 shadow-sm shadow-violet-800 rounded-md p-3"
              />
              <p className="p-2">Create blog</p>
              </Link>
              <Link href={'/admin/manage-users'} className="flex group flex-row items-center">
              <FontAwesomeIcon
                  icon={faUserShield} 
                  className="cursor-pointer scale-90 group-hover:scale-95 shadow-sm shadow-violet-800 rounded-md p-3"
              />
              <p className="p-2  rounded-md">Manage users</p>
              </Link>
              <Link href={'/admin/my-blogs'} className="flex group flex-row items-center">
              <FontAwesomeIcon
                  icon={faBlog} 
                  className="cursor-pointer scale-90 group-hover:scale-95 shadow-sm shadow-violet-800 rounded-md p-3"
              />
              <p className="p-2  rounded-md">My blogs</p>
              </Link>
              <Link href={'/settings'} className="flex group flex-row items-center">
              <FontAwesomeIcon
                  icon={faGear} 
                  className="cursor-pointer scale-90 group-hover:scale-95 shadow-sm shadow-violet-800 rounded-md p-3"
              />
              <p className="p-2  rounded-md">Settings</p>
              </Link>
          </nav>

          <main className={`flex-1 w-full ${menuVisible ? 'w-main' : 'absolute inset-0'} transition-all duration-500`}>
              { children }
          </main>
        </div>
    </div>
  )
}

export default AdminLayout