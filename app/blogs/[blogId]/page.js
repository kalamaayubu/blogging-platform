import BlogDetails from "@/components/BlogDetails"

const BlogDetailsPage = async ({params}) => {
    const { blogId } = params;
    let blogDetails = null

    try {
        const res = await fetch(`http://localhost:3000/api/blogs/blog-details/${blogId}`, {
            next: { revalidate: 60 }
        })
        if (!res.ok) {
            console.log('Could not fetch blog details')
        } else {
            const data = await res.json()
            blogDetails = data.data || null;
        }
    } catch (error) {
        console.error('Error fetching blog details:', error)
    }
  return (
    <div>
        <BlogDetails blog={blogDetails}/>
    </div>
  )
}

export default BlogDetailsPage