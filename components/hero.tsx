import PropertySearchForm from "./propertySearchForm";

const Hero = () => {
  return (
    <section className="bg-blue-700 py-10 mb-4 mt-17">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Property
          </h1>
          <p className="my-2 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
