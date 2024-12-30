
import { db } from '@/utils/db';
import { mkdir, writeFile} from 'fs/promises';
import { join } from 'path'

export async function POST(req) {
    const reqData = await req.formData()
    const authorId = reqData.get('user')
    const title = reqData.get('title')
    const content = reqData.get('content')
    const file = reqData.get('file')

    // Ensure file is uploaded
    if (!file) {
        return new Response(JSON.stringify({ message: 'No file uploaded' }), { status: 400 })
    }

    // Convert file to a buffer
    const bytes = await file.arrayBuffer() // Convert file to an ArrayBuffer
    const buffer = Buffer.from(bytes) // Convert the ArrayBuffer to a buffer for storage

    // Define the directory and file path to save the file
    const publicDir = join(process.cwd(), 'public', 'uploads')
    const path = join(publicDir, file.name) // Construct full file path

    try {
        // Ensure uploads directory exists, creating it recursively if necessary
        await mkdir(publicDir, { recursive: true })
        await writeFile(path, buffer) // Write the uploaded file to the specific path

        const fileUrl = `/uploads/${file.name}` // Relative path to the public folder

        // Save the blog(author, title, content and file) into the database
        try {
            const [ res ] = await db.query(
                `INSERT INTO blogs(adminId, title, img, content)
                VALUES(?, ?, ?, ?)`, [authorId, title, fileUrl, content]
            )
            console.log('Result:', res)
            if (res.affectedRows === 0) {
                return new Response(JSON.stringify({ message: 'Could not save blog' }), { status: 500})
            }

            return new Response(JSON.stringify({ message: 'Blog created successfully' }), { status: 201 });
        } catch (error) {
            console.log('Error saving blog:', error)
            return new Response(JSON.stringify({ message: `Error occured saving blog. please try again later: ${error}`}), { status: 500 })
        }
    } catch (error) {
        console.log('Error uploading image:', error)
        return new Response(JSON.stringify({ message: 'Error uploading image'}), { status: 500 });
    }
}