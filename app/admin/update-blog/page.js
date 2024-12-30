"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const UpdateBlogPage = () => {
    const { blog }  = useSelector(state => state.blog)

    const [title, setTitle] = useState(blog?.title || "");
    const [content, setContent] = useState(blog?.content || "");
    const [file, setFile] = useState(null);
    const [existingFile, setExistingFile] = useState(blog?.img || "")
    const [loading, setIsLoading] = useState(false)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)

        // Create a URL(for preview) for the selected file
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile)
            setExistingFile(previewUrl)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            formData.append('id', blog?.id)
            if (file) {
                formData.append('file', file)
            }

            const res = await fetch('/api/blogs/update-blog', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            if (res.ok) {
                toast.success(`${data.message}`)
            } else {
                toast.error(`${data.message}`)
            }
        } catch (error) {
            console.error('Error updating blog:', error)
            toast.error('Error occurred updating blog')
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="p-4">
            <h1 className="text-center font-bold text-2xl py-6"> Update blog</h1>
            <form onSubmit={handleSubmit} className="m-auto gap-2 w-[80%] max-w-[500px] flex flex-col">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    required
                    className="py-2 px-3 border"
                />
                <textarea
                    placeholder="Blog content"
                    className="py-2 px-3 border"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="flex flex-col justify-between">
                    <p>Current photo:</p>
                    <img src={existingFile} alt={`photo`} className="object-cover w-20 h-20"/>
                </div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="py-2 px-3 border"
                />
                <button className="py-2 px-3 bg-black hover:bg-gray-900 hover:rounded-lg text-white">
                    {loading ? 'Updating...' : 'Update'}
                </button>
        </form>
    </div>
  )
}

export default UpdateBlogPage