import connectDb from "../../../../config/db";
import Property from "../../../../models/property";
import { NextResponse, NextRequest } from "next/server";
import GetSession from "@/utils/getSession";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDb();
    const property = await Property.findById(id);
    console.log("Fetched property:", id);
    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not fetching data" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDb();
    const userSession = await GetSession();

    //check if there is session
    if (!userSession || !userSession.userId) {
      return new NextResponse("user Id is required", { status: 401 });
    }
    const { userId } = userSession;

    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }

    if (property.owner.toString() !== userId) {
      return new NextResponse("forbidden", { status: 403 });
    }

    await property.deleteOne();

    return new NextResponse("property deleted", { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not fetching data" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const sessionUser = await GetSession();
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json("unauthorized, User ID is required", {
        status: 401,
      });
    }

    const { id } = await params;

    const { userId } = sessionUser;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");

    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new NextResponse("Property does not exist", { status: 404 });
    }

    //verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new NextResponse("forbidden", { status: 401 });
    }

    const propertyData = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),

      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },

      beds: formData.get("plots"),
      baths: formData.get("price"),
      square_feet: formData.get("square_meter"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },

      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,

      createdAt: "",
      updatedAt: "",
    };

    //update on database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error could not post data", error },
      { status: 500 },
    );
  }
}
