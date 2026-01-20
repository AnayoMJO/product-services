import connectDb from "@/config/db";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const properties = await Property.find({ is_featured: true });

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not fetching data" },
      { status: 500 }
    );
  }
}
