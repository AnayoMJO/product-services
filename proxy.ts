import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/properties/addProperty",
    "/profile",
    "/properties/saved",
    "/messages",
  ],
};
