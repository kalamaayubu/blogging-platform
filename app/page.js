import BlogsList from "@/components/BlogsList";


export default async function HomePage() {
    let blogs = [];

    // Fetch blogs
    try {
        const res = await fetch('http://localhost:3000/api/blogs/get-blogs')

        if (!res.ok) {
            const error = await res.json();
            console.error('Could not fetch blogs', error.message)
        } else {
            const data = await res.json()
            blogs = data.data // Assign fetched data to blogs
        }

    } catch (error) {
        console.error('Error fetching blogs:', error)
    }
    
    return (
        <div className="p-4">
            <BlogsList blogs={blogs}/>
        </div>
    )
}