import connectDb from "@/config/db";
import Message from "../../../../models/message";
import { NextResponse } from "next/server";
import GetSession from "@/utils/getSession";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectDb();

    const session = await GetSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "user ID is required" },
        { status: 401 }
      );
    }
    const { userId } = session;

    const count = await Message.countDocuments({
      receiver: userId,
      read: false,
    });

    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.error("Error in updating message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
