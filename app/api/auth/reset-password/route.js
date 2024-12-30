import { db } from "@/utils/db"
import bcrypt from 'bcrypt'

export async function POST(req) {
    const url = new URL(req.url) // The request url
    const email = url.searchParams.get('email'); // Get the email param from the url
    const body = await req.json()
    const { password } = body

    try {
        // Ensure recovery token exist before proceeding
        const [tokenResult] = await db.query('SELECT passRecoveryToken FROM users WHERE email = ?', [email])
        console.log('Recovery token:', tokenResult[0]?.passRecoveryToken)
        const recoveryToken = tokenResult[0]?.passRecoveryToken
        if (!recoveryToken) {
            return new Response(JSON.stringify({ message: 'Invalid request. Try to "forgot password"'}), { status: 400 })
        }

        // Save the password and remove the password recovery token
        const hashedPassword = await bcrypt.hash(password, 10)
        const [ res ] =  await db.query(
            ` UPDATE users SET password = ?, passRecoveryToken = NULL WHERE email = ?`
            ,[hashedPassword, email]
        )
        
        if (res.affectedRows > 0) {
            return new Response(JSON.stringify({ message: 'Password reset successfully' }), { status: 200 })
        } else {
            return new Response(JSON.stringify({ message: 'Failed to reset password. Please try again.'}), { status: 404 })
        }
    } catch (error) {
        console.log('Error resetting password:', error)
        return new Response(JSON.stringify({ message: 'Error resetting password' }), { status: 500 })
    }
}