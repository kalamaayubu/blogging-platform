'use client'

import { getMyBlogs } from "@/actions/getMyBlogs"
import AdminBlogCard from "@/components/AdminBlogCard"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const MyBlogs = () => {
  const authorId = useSelector(state => state.auth.user)
  const [myBlogs, setMyBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const res = await getMyBlogs(authorId)
      console.log(`Result: ${res.data}`)
      if (res.success) {
        setMyBlogs(res.data)
      } else {
        console.error(res.message)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [authorId])

  return (
    <div className="p-4 h-screen overflow-y-auto pb-20">
      <h1 className="text-center font-bold text-3xl">My Blogs</h1>
      <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        { myBlogs?.map(blog => (
          <AdminBlogCard key={blog.id} blog={blog}/>
        ))}
      </div>
    </div>
  )
}

export default MyBlogs