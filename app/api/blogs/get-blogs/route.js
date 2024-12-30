import { db } from "@/utils/db"


export async function GET(req) {
    try {
        const [ blogs ] = await db.query('SELECT * FROM blogs')
        if (blogs.length === 0) {
            return new Response(JSON.stringify({ message: 'No blog was found' }), { status: 404})
        } 
        
        return new Response(JSON.stringify({ message: 'Blogs fetched successfully', data: blogs }))
    } catch (error) {
        console.log('Error fetching blogs:', error)
        return new Response(JSON.stringify({ message: `Error fetching blogs: ${error}` }), { status: 500 } )
    }
}