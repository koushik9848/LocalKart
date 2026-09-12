export type Category = {
  id: number;
  name: string;
  description?: string | null;
};

export type Shop = {
  id: number;
  name: string;
  description?: string | null;
  address: string;
  imageUrl?: string | null;
  category?: string | null;
  rating?: number | null;
  distance?: string | null;
  isOpen?: boolean | null;
};

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  shopId: number;
  shopName: string;
  categoryId: number;
  categoryName: string;
  quantity?: number | null;
};
