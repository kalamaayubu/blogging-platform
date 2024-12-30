'use client'

import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState()
    const [loading, setIsLoading] = useState(false)

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    // Get the user in the current session from redux store
    const { user } = useSelector(state => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData()
            formData.append('user', user)
            formData.append('title', title)
            formData.append('content', content)
            if(file) {
                formData.append('file', file)
            }

            const res = await fetch('/api/blogs/create-blog', {
                method: 'POST',
                body: formData
            })

            if(!res.ok) {
                throw new Error('Failed to create blog')
            }

            toast.success('Blog created successfully')
            setTitle('')
            setContent('')
            setFile(null)
        } catch (error) {
            console.error('Error creating new blog:', error)
            toast.error('Failed to create a new blog.')
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div>
        <div>
            <h1 className="text-center font-bold text-2xl py-6"> Create new blog</h1>
            <form onSubmit={handleSubmit} className="m-auto gap-2 w-[80%] max-w-[500px] flex flex-col">
                <input
                    type="text"
                    placeholder="Blog title"
                    className="py-2 px-3 border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Blog content"
                    className="py-2 px-3 border"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="py-2 px-3 border"
                />
                <button className="py-2 px-3 bg-black hover:bg-gray-900 hover:rounded-lg text-white">
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    </div>
  )
}

export default CreateBlog