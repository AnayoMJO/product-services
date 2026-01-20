const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const fetchProperties = async ({ showFeatured = false } = {}) => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

export const fetchProperty = async ({ id }: { id: string }) => {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
};
