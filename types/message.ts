interface Property {
  _id: string;
  name: string;
}

export type MessageType = {
  _id?: string;
  sender: string;
  receiver: string;
  property: Property | null;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read?: boolean;
  createdAt: string;
};
