import connectDb from "@/config/db";
import Property from "@/models/property";
import { NextResponse, NextRequest } from "next/server";
import GetSession from "@/utils/getSession";
import { geocodeLocation } from "../../../utils/geocode";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const page = request.nextUrl.searchParams.get("page") || "1";
    const pageSize = request.nextUrl.searchParams.get("pageSize") || "6";
    const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const totalProperties = await Property.countDocuments();

    const properties = await Property.find()
      .skip(skip)
      .limit(parseInt(pageSize));

    const result = {
      properties,
      totalProperties,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not fetching data" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const sessionUser = await GetSession();
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json("unauthorized, User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const rawImages = formData.getAll("images") as string[];
    const images = rawImages.filter(
      (img): img is string => typeof img === "string",
    );

    const street = formData.get("location.street")?.toString();
    const city = formData.get("location.city")?.toString();
    const state = formData.get("location.state")?.toString();
    const zipcode = formData.get("location.zipcode")?.toString();

    const fullAddress = {
      street,
      city,
      state,
      zipcode,
    };

    const center = await geocodeLocation(fullAddress);

    if (!center) {
      return NextResponse.json(
        { message: "Invalid address. Could not geocode location." },
        { status: 400 },
      );
    }

    const propertyData = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),

      location: {
        street,
        city,
        state,
        zipcode,
        center,
      },

      plots: formData.get("plots"),
      price: formData.get("price"),
      square_meter: formData.get("square_meter"),
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
      images,
      is_featured: false,

      createdAt: "",
      updatedAt: "",
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return NextResponse.json(
      { message: "Property created", property: newProperty },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE PROPERTY ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error could not post data", error },
      { status: 500 },
    );
  }
}
