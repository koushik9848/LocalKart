import type { Category, Product, Shop } from "./types";

export const demoCategories: Category[] = [
  { id: 1, name: "Groceries", description: "Everyday staples" },
  { id: 2, name: "Beverages", description: "Milk, juices and drinks" },
  { id: 3, name: "Snacks", description: "Biscuits and quick bites" },
  { id: 4, name: "Household", description: "Home care essentials" },
];

export const demoShops: Shop[] = [
  {
    id: 1,
    name: "Fresh Mart",
    description: "Fresh groceries and daily essentials",
    address: "Kukatpally, Hyderabad",
    category: "Daily essentials",
    rating: 4.8,
    distance: "0.8 km",
    isOpen: true,
  },
  {
    id: 2,
    name: "Local Grocery Store",
    description: "Your neighborhood grocery store",
    address: "KPHB, Hyderabad",
    category: "Groceries",
    rating: 4.5,
    distance: "1.4 km",
    isOpen: true,
  },
];

export const demoProducts: Product[] = [
  { id: 1, name: "Basmati Rice 5kg", description: "Premium long-grain basmati rice", price: 450, shopId: 1, shopName: "Fresh Mart", categoryId: 1, categoryName: "Groceries", quantity: 50 },
  { id: 2, name: "Toor Dal 1kg", description: "Premium quality toor dal", price: 160, shopId: 1, shopName: "Fresh Mart", categoryId: 1, categoryName: "Groceries", quantity: 35 },
  { id: 3, name: "Fresh Milk 1L", description: "Full cream fresh milk", price: 65, shopId: 1, shopName: "Fresh Mart", categoryId: 2, categoryName: "Beverages", quantity: 40 },
  { id: 4, name: "Mango Juice 1L", description: "Refreshing mango fruit drink", price: 120, shopId: 1, shopName: "Fresh Mart", categoryId: 2, categoryName: "Beverages", quantity: 15 },
  { id: 5, name: "Chocolate Biscuits", description: "Crunchy chocolate biscuits", price: 40, shopId: 2, shopName: "Local Grocery Store", categoryId: 3, categoryName: "Snacks", quantity: 60 },
  { id: 6, name: "Potato Chips", description: "Crispy salted potato chips", price: 30, shopId: 2, shopName: "Local Grocery Store", categoryId: 3, categoryName: "Snacks", quantity: 45 },
  { id: 7, name: "Dishwashing Liquid", description: "Lemon scented dishwashing liquid", price: 110, shopId: 2, shopName: "Local Grocery Store", categoryId: 4, categoryName: "Household", quantity: 18 },
  { id: 8, name: "Laundry Detergent 2kg", description: "Powerful detergent for everyday washing", price: 240, shopId: 2, shopName: "Local Grocery Store", categoryId: 4, categoryName: "Household", quantity: 25 },
];
