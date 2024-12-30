import { db } from "@/utils/db"


export async function getAllUsers() {
    try {
        const  [ rows ]  = await db.query('SELECT * FROM users')
        if (rows && rows.length > 0) {
            console.log('getAllUsers Result:', rows)
            return { success: true, data: rows }
        } else {
            return { success: false, message: "No users found" };
        }
    } catch (error) {
        console.log('Error fetching users:', error)
        return { sucess: false, message: 'Error fetching users'}
    }
}