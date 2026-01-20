import connectDb from "@/config/db";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import GetSession from "@/utils/getSession";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDb();

    const sessionUser = await GetSession();
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json("unauthorized, User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    const bookmarks = await user.populate("bookmarks");

    return NextResponse.json(
      { bookmarks: bookmarks?.bookmarks || [] },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in bookmark route:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not process bookmark" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { propertyId } = await request.json();

    const sessionUser = await GetSession();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json("unauthorized, User ID is required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;

    const user = await User.findById(userId);

    const isBookmarked = user?.bookmarks.includes(propertyId);

    return NextResponse.json({ isBookmarked }, { status: 200 });
  } catch (error) {
    console.log("Error in bookmark route:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not process bookmark" },
      { status: 500 }
    );
  }
}
