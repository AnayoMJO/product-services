import connectDb from "@/config/db";
import Message from "../../../../models/message";
import { NextRequest, NextResponse } from "next/server";
import GetSession from "@/utils/getSession";

export const dynamic = "force-dynamic";

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDb();

    const { id } = await params;

    const session = await GetSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "user ID is required" },
        { status: 401 }
      );
    }
    const { userId } = session;

    const message = await Message.findById(id);

    if (!message) {
      return new NextResponse("Message not found", { status: 404 });
    }

    if (message.receiver.toString() !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    message.read = !message.read;
    await message.save();

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("Error in updating message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDb();

    const { id } = await params;

    const session = await GetSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "user ID is required" },
        { status: 401 }
      );
    }
    const { userId } = session;

    const message = await Message.findById(id);

    if (!message) {
      return new NextResponse("Message not found", { status: 404 });
    }

    if (message.receiver.toString() !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new NextResponse("Message deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error in updating message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
