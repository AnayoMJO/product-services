export function buildAddress(location: {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}) {
  return [location.street, location.city, location.state, location.zipcode]
    .filter(Boolean)
    .join(", ");
}

export async function geocodeLocation(location: {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}) {
  const address = buildAddress(location);

  if (!address) return null;

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address,
    )}.json?access_token=${process.env.MAPBOX_TOKEN}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  if (!data.features?.length) return null;

  return data.features[0].center as [number, number];
}
