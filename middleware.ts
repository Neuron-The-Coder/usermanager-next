/* eslint-disable @next/next/no-server-import-in-page */
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req : NextRequest){
  if (req.nextUrl.pathname.startsWith('/menu')) {
    
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

}