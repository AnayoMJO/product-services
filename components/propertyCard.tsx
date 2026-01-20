import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
import { Property } from "@/types/property";

const PropertyCard = ({ property }: { property: Property }) => {
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
    <div className="bg-white rounded-xl shadow-md relative">
      {property.images?.[0] && property.images[0].trim() !== "" && (
        <Image
          src={property.images[0]}
          alt={property.name}
          width={400}
          height={300}
          sizes="100vw"
          className="w-full h-[17rem] rounded-t-xl object-cover"
        />
      )}
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${rately()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" />
            {property.plots} <span className="md:hidden lg:inline">plots</span>
          </p>
          <p>
            <FaMoneyBill className="inline mr-2" /># {property.price}{" "}
            <span className="md:hidden lg:inline">price</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_meter}{" "}
            <span className="md:hidden lg:inline">sqm</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              {" "}
              <FaMoneyBill className="inline mr-2" />
              nightly
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              nightly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="inline mr-2 text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
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

export default PropertyCard;
