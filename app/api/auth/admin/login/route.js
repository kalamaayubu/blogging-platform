import { adminExists } from "@/utils/adminExists";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export async function POST(req) {
    try {
        const body = await req.json()
        const { username, password } = body

        // Check if the user exists in the database
        const user = await adminExists(username)
        if (!user) {
            return new Response(JSON.stringify({ message: 'Admin does not exist' }), { status: 400 });
        }

        // Check correctness of the password
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
        }

        // Generate token for the session
        const tokenPayload = {
            username: user.username,
            email: user.email,
            userRole: 'admin'
        }
        const token = jwt.sign(
            tokenPayload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return new Response(JSON.stringify({ message: 'Session token generated', user: user }), {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`
            }
        })
    }
    catch (error) {
        console.log('Error during login:', error)
        return new Response(JSON.stringify({ message: `An error occured loging in ${error}`}), { status: 500 });
    }
}