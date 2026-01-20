"use client";
import React from "react";
import PropertyCard from "@/components/propertyCard";
import { Property } from "@/types/property";
import { useEffect, useState } from "react";
import Spinner from "./spinner";
import Pagination from "./pagination";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(6);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(
            "Network response was not ok filed to fetch properties"
          );
        }
        const data = await response.json();
        setProperties(data.properties);
        setTotalItems(data.totalProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        {properties.length === 0 ? (
          <h1 className="mx-auto items-center">No properties Found</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.length > 0 &&
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}
        <Pagination
          page={page}
          totalItems={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default PropertiesPage;
