"use client";
import { useState, useEffect } from "react";
import { fetchProperty } from "../../../utils/request";
import { useParams } from "next/navigation";
import { Property as PropertyType } from "../../../types/property";
import PropertyHeaderImage from "@/components/propertyHeaderImage";
import PropertyDetails from "@/components/propertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "../../../components/propertyImages";
import BookMarkButton from "@/components/bookMarkButton";
import ShareButtons from "@/components/shareButtons";
import PropertyContactForm from "@/components/propertyContactForm";

const Property = () => {
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id }: { id: string } = useParams();

  useEffect(() => {
    const getProperty = async () => {
      if (!id) return;
      try {
        const data = await fetchProperty({ id });
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    getProperty();
  }, [id]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10 ">
        No property found
      </h1>
    );
  }
  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <BookMarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default Property;
