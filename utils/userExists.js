import { db } from "./db";

export async function userExists(username){
    const [ user ] = await db.query(`SELECT * FROM users WHERE username = ?`, [username])
    return user.length > 0 ? user[0] : null; // Returns the user object, otherwise null
}

export async function userEmailExists(email){
    const [ user ] = await db.query(`SELECT * FROM users WHERE email = ?`, [email])
    return user.length > 0 ? user[0] : null; // Returns the user object, otherwise null
}

