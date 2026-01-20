"use client";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "../types/property";
import pin from "../assets/images/pin.svg";
import Image from "next/image";

const PropertyMap = ({ property }: { property: Property }) => {
  const center = property.location.center;

  if (!center || center.length !== 2) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Location not available</p>
      </div>
    );
  }

  const [lng, lat] = center;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      reuseMaps
      initialViewState={{
        latitude: lat,
        longitude: lng,
        zoom: 14,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image width={50} height={50} src={pin} alt="location" />
      </Marker>
    </Map>
  );
};
export default PropertyMap;
