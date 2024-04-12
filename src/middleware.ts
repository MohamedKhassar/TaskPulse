import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const protectedRoutes = ["/profile", "/project"];
    const authRoutes = ["/login", "/register"];
    const publicRoutes = ["/about", "/"];
    const currentUser = request.cookies.get('__Secure.next-auth.session-token')?.value;

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/profile", request.url).toString());
    }
    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !currentUser) {
        return NextResponse.redirect(new URL("/login", request.url).toString());
    }

    return NextResponse.next();
}

export default middleware as NextMiddleware;
