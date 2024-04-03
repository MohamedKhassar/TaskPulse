import { NextResponse, type NextRequest } from 'next/server'
export { default } from 'next-auth/middleware';

export function middleware(request: NextRequest) {
    const protectedRoutes = ["/profile"];
    const authRoutes = ["/login", "/register"];
    const publicRoutes = ["/about", "/"];
    const currentUser = request.cookies.get('next-auth.session-token')?.value
    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
    if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

}