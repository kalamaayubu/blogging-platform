import { jwtVerify } from "jose";
import { NextResponse } from "next/server"


// Configure matcher
export const config = {
   matcher: ['/blogs/:path*', '/admin/:path*', '/authentication/:path*']
}

export async function middleware(req) {
    const { pathname } = req.nextUrl; // Get the pathname from the request URL
    const token = req.cookies.get('sessionToken')?.value // Get token from cookies

    // Define protected and authentication routes
    const isProtectedRoute = pathname.startsWith("/blogs") || pathname.startsWith("/admin") || pathname.startsWith("/dashboard");
    const isAuthRoute = pathname.startsWith("/authentication");

    if (!token && isAuthRoute) {
      return NextResponse.next(); // Allow access to login/signup pages without a token
    }

    // If no token and accessing protected routes, redirect to login
    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }   

    try {
      // Allow authenticated users to access protected routes
      if (token) {
         // Verify the token
         const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)); // Get payload by decoding token

         // Handle admin route access
         if (isProtectedRoute && !pathname.startsWith('/admin')) {
            return NextResponse.next()
         } 
         if (pathname.startsWith('/admin') && payload?.userRole === 'admin') {
            return NextResponse.next()
         } else if (pathname.startsWith('/admin') && payload?.userRole === 'user') {
            return NextResponse.redirect(new URL('/', req.url))
         }
      }
    } catch (error) {
      // if the error is due to token expiry
      if (error.name === "JWTExpired") {
         const url = new URL('/authentication/login', req.url)
         url.searchParams.set("message", encodeURIComponent("Session expired. Please log in again"))
         return NextResponse.redirect(url)
      }
    }

    // Redirect logged-in users away from authentication pages
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
    }

 console.error("Token verification failed:", error); // Log unexpected errors
 return NextResponse.next()
}