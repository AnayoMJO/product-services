import PropertyCard from "./propertyCard";
import Link from "next/link";
import { fetchProperties } from "../utils/request";
import { Property } from "../types/property";

const HomePageProperties = async () => {
  const data = await fetchProperties();
  const properties = Array.isArray(data) ? data : data.properties || [];
  const recentProperties = properties
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentProperties.length === 0 ? (
              <h1 className="mx-auto items-center">
                No recent properties Found
              </h1>
            ) : (
              recentProperties.map((property: Property) => (
                <div key={property._id}>
                  <PropertyCard property={property} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomePageProperties;
