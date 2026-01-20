import PropertySearchForm from "@/components/propertySearchForm";
import PropertiesPage from "@/components/properties";

async function Properties() {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-4 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <PropertiesPage />
    </>
  );
}

export default Properties;
