import { NextResponse } from "next/server";


export async function POST(){
    try {
        // Expire the session token
        const response = NextResponse.json({ message: 'Logged out successfully' });
        response.cookies.set('sessionToken', '', {
            path: '/',
            expires: new Date(0), // Expires immediately
            sameSite: 'strict',
            secure: true,
        })
        return response;
    } catch (error) {
        console.log('Logout error:', error)
        return new Response(JSON.stringify({ message: 'Error loging out'}), { status: 500 });
    }
}