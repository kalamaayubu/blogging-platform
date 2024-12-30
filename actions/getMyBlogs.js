'use server'

import { db } from "@/utils/db"

export async function getMyBlogs(authorId) {
    try {
        const [ myBlogs ] = await db.query('SELECT * FROM blogs WHERE adminId = ?', [authorId])

        if (myBlogs.affectedRows === 0) {
            console.log('Could not get blogs')
            return { success: false, message: 'Could not get blogs' }
        } 

        return { success: true, data: myBlogs }
    } catch (error) {
        console.log("Error fetching blogs:", error);
        return { success: false, message: 'Error fetching blogs' }
    }
}