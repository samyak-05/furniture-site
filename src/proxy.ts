import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse,  } from "next/server";

export async function proxy(req:NextRequest){

    const { pathname } = req.nextUrl;
    const publicURL = ["/signin","/signup", "/favicon.ico", "/_next"];
    if(publicURL.some((path) => pathname.startsWith(path))){
        return NextResponse.next();
    }

    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    console.log(token);
    if(!token){
        const url = new URL("/signin", req.url);
        url.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};