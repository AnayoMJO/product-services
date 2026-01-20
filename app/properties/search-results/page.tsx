"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Property } from "@/types/property";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/propertyCard";
import Spinner from "@/components/spinner";
import PropertySearchForm from "@/components/propertySearchForm";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "All";

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-4 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="bg-blue-50 px-4 pt-6 pb-10">
          <div className="container-xl lg:container m-auto">
            <Link
              href="/properties"
              className="flex items-center text-blue-500 mb-3 hover:underline"
            >
              <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to all
              properties
            </Link>
            <h1 className="text-2xl mb-4 text-center">Search results</h1>
            {properties.length === 0 ? (
              <h1 className="mx-auto items-center">No search result found</h1>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.length > 0 &&
                  properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
