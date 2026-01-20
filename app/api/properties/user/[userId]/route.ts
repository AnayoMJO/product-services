import connectDb from "../../../../../config/db";
import Property from "../../../../../models/property";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    await connectDb();
    if (!userId) {
      return new NextResponse("user ID is required", { status: 400 });
    }
    const property = await Property.find({ owner: userId });

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not fetching data" },
      { status: 500 }
    );
  }
}
