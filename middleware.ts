import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  // ❗ لا تعمل أي auth check هنا
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
