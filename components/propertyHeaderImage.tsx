import Image from "next/image";

const PropertyHeaderImage = ({ image }: { image: string }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          {image && image.trim() !== "" && (
            <Image
              src={image}
              alt="Property Image"
              className="object-cover w-full max-h-[400px] h-auto"
              width={80}
              height={40}
              sizes="100vw"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
