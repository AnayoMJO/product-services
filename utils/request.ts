const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Browser
    return "";
  }

  // Server
  return (
    process.env.NEXT_PUBLIC_DOMAIN ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  );
};

export const fetchProperties = async ({ showFeatured = false } = {}) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/properties${showFeatured ? "/featured" : ""}`;
    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data = await res.json();
    console.log("Fetched properties:", data);
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return showFeatured ? [] : { properties: [] };
  }
};

export const fetchProperty = async ({ id }: { id: string }) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/properties/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
};
