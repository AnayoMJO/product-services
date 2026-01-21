const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

const getApiUrl = (path: string) => {
  if (typeof window === "undefined") {
    // Server-side: use relative path
    return `/api${path}`;
  }
  // Client-side: use API domain if available
  return apiDomain ? `${apiDomain}${path}` : `/api${path}`;
};

export const fetchProperties = async ({ showFeatured = false } = {}) => {
  try {
    const url = getApiUrl(`/properties${showFeatured ? "/featured" : ""}`);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { properties: [] };
  }
};

export const fetchProperty = async ({ id }: { id: string }) => {
  try {
    const url = getApiUrl(`/properties/${id}`);
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
