import connectDb from "@/config/db";
import Property from "@/models/property";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location") || "";
    const propertyType = searchParams.get("propertyType") || "All";

    const locationPattern = new RegExp(location, "i");

    const query: Record<string, unknown> = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zip": locationPattern },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log("Error in property search route:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not process search" },
      { status: 500 }
    );
  }
};
