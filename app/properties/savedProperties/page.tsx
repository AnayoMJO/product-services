"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/propertyCard";
import Spinner from "@/components/spinner";
import { toast } from "react-toastify";
import { Property } from "../../../types/property";

const SavedPropertiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [propertie, setPropertie] = useState<Property[]>([]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("/api/bookMarks/check");

        if (response.status === 200) {
          const data = await response.json();
          setPropertie(data.bookmarks);
        } else {
          console.log(response.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <h1 className="text-2xl font-bold mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto">
        {propertie.length === 0 ? (
          <h1 className="mx-auto items-center">No properties Found</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertie.length > 0 &&
              propertie.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
