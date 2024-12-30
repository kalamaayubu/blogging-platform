"use server"

import { db } from "@/utils/db"
import { revalidatePath } from "next/cache";

export async function deleteBlog(blogId) {
    try {
        const [ res ] = await db.query('DELETE FROM blogs WHERE id = ?', [blogId])
        if (res.affectedRows === 0) {
            return { success: false, message: 'Could not delete blog'}
        } else {
            // Refresh the pages that lists blogs
            revalidatePath("/admin/my-blogs")
            return { success: true, message: 'Blog deleted successfully',}
        }
    } catch (error) {
        console.log('Error deleting blog:', error)
        return { success: false, message: `Error deleting blog`}
    }
}