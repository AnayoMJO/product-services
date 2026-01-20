import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={500}
              height={400}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt="property images"
                  width={20}
                  height={400}
                  sizes="100vw"
                  priority={true}
                  className="object-cover h-[20rem] mx-auto rounded-xl"
                />
              )}
            </Item>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width={500}
                    height={400}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt="property images"
                        width={0}
                        height={400}
                        sizes="100vw"
                        className="object-cover h-[20rem] w-full rounded-xl  "
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
