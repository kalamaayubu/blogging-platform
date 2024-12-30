import { db } from "@/utils/db";


export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    console.log(`token from URL: ${token}`)

    try {
        // Find a matching verification token in the database
        const [ user ] = await db.query('SELECT * FROM admins WHERE verificationToken = ?', [token])
        console.log('Admin found:', user);  // Debugging line

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid or expired token'}), { status: 400 })
        }

        // Check if the verification token is already NULL (already verified)
        if (user[0].verificationToken === null) {
            console.log('VerificationToken:', verificationToken);  // Debugging line
            return new Response(JSON.stringify({ message: 'Email already verified' }), { status: 400 });
        }

        // Update verification status to true and set verification token to NULL
        const [updatedUser] = await db.query(`
            UPDATE admins 
            SET verificationToken = NULL, isVerified = ? 
            WHERE id = ?
        `, [1, user[0].id])
        console.log('Updated admin:', updatedUser);  // Debugging line

        if (updatedUser.affectedRows > 0) {
            return new Response(JSON.stringify({ message: `Email verified successfully`}), { status: 200 })
        }  else {
            // Return a message if no rows were updated
            return new Response(JSON.stringify({ message: 'Unable to verify email, please try again later.' }), { status: 400 });
        }
    } catch (error) {
        console.log('Error verifying email', error);
        return new Response(JSON.stringify({ message: 'Error verifying account'}), { status: 500 })
    }
}