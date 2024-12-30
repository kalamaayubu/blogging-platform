import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { db } from '@/utils/db'

export async function POST(req) {
    const reqData = await req.formData()
    const title = reqData.get('title')
    const content = reqData.get('content')
    const id = reqData.get('id')
    const file = reqData.get('file')

    // Ensure file is uploaded
    if (!file) {
        return new Response(JSON.stringify({ message: 'No file uploaded' }), { status: 400 })
    }

    // Convert file to a buffer
    const bytes = await file.arrayBuffer() // Covert file to an ArrayBuffer
    const buffer = Buffer.from(bytes) // Convert the bytes to buffer for storage

    // Define the path for saving the image
    const publicDir = join(process.cwd(), 'public', 'uploads')
    const path = join(publicDir, file.name)

    try {
        // Ensure directory exist
        await mkdir(publicDir, { recursive: true })
        await writeFile(path, buffer) // Write the file to the specific path

        const fileUrl = `/uploads/${file.name}` // Relative path to the public directory

        try {
            const [ res ] = await db.query(`
                UPDATE blogs 
                SET title = ?, content = ?, img = ? 
                WHERE id = ?
            `, [title, content, fileUrl, id])

            if (res.affectedRows === 0) {
                return new Response(JSON.stringify({ message: 'Could not update blog'}), { status : 500 })
            }

            return new Response(JSON.stringify({ message: 'Blog updated successfully', data: res }), { status : 200 })
        } catch (error) {
            console.log('Error updating blog', error)
            return new Response(JSON.stringify({ message: 'Error updating blog to the database'}), { status : 500 })
        }
    } catch (error) {
        console.log('Error processing data:', error)
        return new Response(JSON.stringify({ message: 'Error processing update data'}), { status : 500 })
    }
}