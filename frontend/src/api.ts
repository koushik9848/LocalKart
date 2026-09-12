import { demoCategories, demoProducts, demoShops } from "./data";
import type { Category, Product, Shop } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export async function loadCatalog(): Promise<{ shops: Shop[]; products: Product[]; categories: Category[]; usingDemoData: boolean }> {
  try {
    const [shops, products, categories] = await Promise.all([
      get<Shop[]>("/shops"),
      get<Product[]>("/products"),
      get<Category[]>("/categories"),
    ]);
    return { shops, products, categories, usingDemoData: false };
  } catch {
    return { shops: demoShops, products: demoProducts, categories: demoCategories, usingDemoData: true };
  }
}
