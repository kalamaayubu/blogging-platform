import { db } from "@/utils/db";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { userExists } from "@/utils/userExists";
import bcrypt from 'bcrypt'
import crypto from 'crypto'


export async function POST(req) {
    const body = await req.json();
    const { username, email, password } = body;

    try {
        // Check if the username already exist
        // const [ existingUsername ] = await db.query(`SELECT * FROM users WHERE username = ?`, [username])
        const existingUsername = userExists(username)
        if (existingUsername === null) {
            return new Response(JSON.stringify({ message: 'Username already taken.' }), { status: 400 });
        }

        // Check if the email already exist
        const [ existingEmail ] = await db.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (existingEmail.length > 0) {
            return new Response(JSON.stringify({ message: 'Email already in use.' }), { status: 400 });
        }

        // Hash the password and create a verification token
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = crypto.randomBytes(32).toString('hex')

        // Save to the database with isVerified status FALSE
        const [ result ] = await db.query(
            `INSERT INTO users(username, email, password, isVerified, verificationToken) VALUES(?, ?, ?, ?, ?)`, 
            [username, email, hashedPassword, 0, verificationToken]
        )

        if (!result.affectedRows > 0) {
            return new Response(JSON.stringify({ message: `Could not perform registration. ${error}`}), { status: 201 })
        }
        
        // Send account verification email
        await sendVerificationEmail(email, verificationToken)
        return new Response(JSON.stringify({ message: 'Verification email sent successfully.' }), { status: 200 });
    } catch (error) {
        console.log('Error in registration:', error)
        return new Response(JSON.stringify({ message: `Error in registration ${error}` }), { status: 500 });
    }
}