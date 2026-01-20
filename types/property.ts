export type Property = {
  _id: "";
  owner: string;
  name: string;
  type: string;
  description: string;

  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    center?: number[];
  };

  plots: number;
  price: number;
  square_meter: number;

  amenities: string[];

  rates: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };

  seller_info: {
    name: string;
    email: string;
    phone: string;
  };

  images: string[];
  is_featured?: boolean;

  createdAt: string;
  updatedAt: string;
};

export type EditProperty = Omit<Property, "images">;
