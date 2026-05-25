import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only these specific paths require authentication
    const protectedPaths = ["/cart", "/orders", "/profile", "/buy", "/addtocart","/admin"];
    
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        console.log(token);
        
        if (!token) {
            const url = new URL("/signin", req.url);
            url.searchParams.set("callbackUrl", req.url);
            return NextResponse.redirect(url);
        }

        const role = token.role || "customer"; // Default to 'customer' if no role is found

        if(pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        if(pathname.startsWith("/customer") && role !== "customer") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    // Every other path is wide open by default
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};