import { db } from "./db";

export async function adminExists(username){
    const [ user ] = await db.query(`SELECT * FROM admins WHERE username = ?`, [username])
    return user.length > 0 ? user[0] : null; // Returns the user object, otherwise null
}