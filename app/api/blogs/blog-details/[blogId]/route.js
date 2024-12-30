import { db } from "@/utils/db"


export async function GET( req, { params }) {
    const { blogId } = params

    try {
        const [res] = await db.query('SELECT * FROM blogs WHERE id = ?', [blogId])
        console.log('Blog id:', blogId)
        if (res.length === 0) {
            return new Response(JSON.stringify({ message: 'Requested blog could not be found'}), { status: 404 });
        }
        const blog = res[0];// Return the firs item form the query result
        return new Response(JSON.stringify({ message: 'Blog details fetched successfully', data: blog}), { status: 200 })
    } catch (error) {
        console.log('Error fetching blog details:', error)
        return new Response(JSON.stringify({ message: `Error fetching blog details` }), { status: 500 })
    }
}