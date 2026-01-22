import { Property } from "@/types/property";
import Link from "next/link";
import Image from "next/image";
import {
  FaBed,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const FeaturedPropertiesCard = ({ property }: { property: Property }) => {
  const rately = () => {
    if (property.rates.monthly) {
      return `${property.rates.monthly.toLocaleString()}/mo`;
    } else if (property.rates.weekly) {
      return `${property.rates.weekly.toLocaleString()}/wk`;
    } else if (property.rates.nightly) {
      return `${property.rates.nightly.toLocaleString()}/nt`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      {property.images?.[0] && property.images[0].trim() !== "" && (
        <Image
          src={property.images[0]}
          alt={property.name}
          width={40}
          height={30}
          sizes="100vw"
          className="w-full rounded-t-xl object-cover md:w-2/5 md:rounded-tr-none"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${rately()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-2" /> {property.plots}{" "}
            <span className="md:hidden lg:inline">plots</span>
          </p>
          <p>
            <FaMoneyBill className="inline-block mr-2" /># {property.price}{" "}
            <span className="md:hidden lg:inline">price</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_meter}{" "}
            <span className="md:hidden lg:inline">sqm</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FaMoneyBill className="inline-block mr-2" /> Nightly
          </p>
          <p>
            <FaMoneyBill className="inline-block mr-2" /> Weekly
          </p>
          <p>
            <FaMoneyBill className="inline-block mr-2" /> Monthly
          </p>
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="inline-block mr-2 mt-1 text-orange-700" />
            <span className="text-orange-700">
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesCard;
