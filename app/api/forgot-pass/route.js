import { db } from "@/utils/db"
import { sendEmail } from "@/utils/sendEmail"
import { userEmailExists } from "@/utils/userExists"
import crypto from 'crypto'


export async function POST(req) {
    const body = await req.json()
    const { email } = body

    try {
        // Check if the email is registered
        console.log('Email:', email) // kalamaayubu913@gmail.com
        const user = await userEmailExists(email)
        console.log('Recovery user:', user)
        if (!user) {
            return new Response(JSON.stringify({ message: 'Email is not registered' }), { status: 400 });
        }

        // Create a security key
        const securityKey = crypto.randomBytes(32).toString('hex')

        // Save the securityKey in the database for tracking and make it null once the user reset their password
        const [ rows ] = await db.query(
            'UPDATE users SET passRecoveryToken = ? WHERE email = ?', 
            [securityKey, email]
        )

        if (rows.affectedRows === 0) {
            return new Response(JSON.stringify({ message: `Something went wrong. Please try again later.`}), { status: 401 })
        }

        // Send the recovery email
        const emailInfo = {
            route: 'authentication/reset-password',
            heading: 'Password recovery',
            message: 'Click the button below to reset your password',
            actionText: 'Reset password',
            subject: 'Password recovery'
        }
        
        const res = await sendEmail(email, securityKey, 'Password recovery', emailInfo)
        
        return new Response(JSON.stringify({ message: `${res}`}), { status: 200 })
    } catch (error) {
        console.log('Error in password recovery:', error)
        return new Response(JSON.stringify({ message: 'Error in password recovery'}), {status: 500 });
    }
    
}