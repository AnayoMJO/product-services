import connectDb from "@/config/db";
import Message from "../../../models/message";
import { NextRequest, NextResponse } from "next/server";
import GetSession from "@/utils/getSession";

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

    const readMessages = await Message.find({ receiver: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unReadMessages = await Message.find({ receiver: userId, read: false })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unReadMessages, ...readMessages];

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error in getting messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { name, email, phone, body, receiver, property } =
      await request.json();

    const session = await GetSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized, must be logged in" },
        { status: 401 }
      );
    }

    const { user } = session;

    if (user.id === receiver) {
      return NextResponse.json(
        { message: "You cannot send message to yourself" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      receiver,
      name,
      email,
      phone,
      body,
      property,
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
