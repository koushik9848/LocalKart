import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting LocalKart database seed...");

  // Clear existing data in the correct dependency order
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.user.deleteMany();

  // Password used for all demo accounts
  const password = await bcrypt.hash("LocalKart@123", 10);

  // -------------------------
  // USERS
  // -------------------------
  const customer = await prisma.user.create({
    data: {
      name: "Koushik",
      email: "customer@localkart.com",
      password,
      phone: "9876543210",
      role: UserRole.CUSTOMER,
    },
  });

  const shopkeeper1 = await prisma.user.create({
    data: {
      name: "Raj Kumar",
      email: "raj@localkart.com",
      password,
      phone: "9876543211",
      role: UserRole.SHOPKEEPER,
    },
  });

  const shopkeeper2 = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya@localkart.com",
      password,
      phone: "9876543212",
      role: UserRole.SHOPKEEPER,
    },
  });

  await prisma.user.create({
    data: {
      name: "Delivery Partner",
      email: "delivery@localkart.com",
      password,
      phone: "9876543213",
      role: UserRole.DELIVERY_PARTNER,
    },
  });

  await prisma.user.create({
    data: {
      name: "LocalKart Admin",
      email: "admin@localkart.com",
      password,
      phone: "9876543214",
      role: UserRole.ADMIN,
    },
  });

  // -------------------------
  // SHOPS
  // -------------------------
  const freshMart = await prisma.shop.create({
    data: {
      name: "Fresh Mart",
      description: "Fresh groceries and daily essentials",
      address: "Kukatpally, Hyderabad",
      latitude: 17.4849,
      longitude: 78.4138,
      ownerId: shopkeeper1.id,
    },
  });

  const localGrocery = await prisma.shop.create({
    data: {
      name: "Local Grocery Store",
      description: "Your neighborhood grocery store",
      address: "KPHB, Hyderabad",
      latitude: 17.4933,
      longitude: 78.3996,
      ownerId: shopkeeper2.id,
    },
  });

  // -------------------------
  // CATEGORIES
  // -------------------------
  const groceries = await prisma.category.create({
    data: {
      name: "Groceries",
      description: "Rice, pulses, flour and other essentials",
    },
  });

  const beverages = await prisma.category.create({
    data: {
      name: "Beverages",
      description: "Milk, juices and soft drinks",
    },
  });

  const snacks = await prisma.category.create({
    data: {
      name: "Snacks",
      description: "Biscuits, chips and packaged snacks",
    },
  });

  const household = await prisma.category.create({
    data: {
      name: "Household",
      description: "Everyday household essentials",
    },
  });

  // -------------------------
  // PRODUCTS
  // -------------------------
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Basmati Rice 5kg",
        description: "Premium long-grain basmati rice",
        price: 450,
        shopId: freshMart.id,
        categoryId: groceries.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Toor Dal 1kg",
        description: "Premium quality toor dal",
        price: 160,
        shopId: freshMart.id,
        categoryId: groceries.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Wheat Flour 5kg",
        description: "Fresh chakki atta",
        price: 280,
        shopId: freshMart.id,
        categoryId: groceries.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Fresh Milk 1L",
        description: "Full cream fresh milk",
        price: 65,
        shopId: freshMart.id,
        categoryId: beverages.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Mango Juice 1L",
        description: "Refreshing mango fruit drink",
        price: 120,
        shopId: freshMart.id,
        categoryId: beverages.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Chocolate Biscuits",
        description: "Crunchy chocolate biscuits",
        price: 40,
        shopId: localGrocery.id,
        categoryId: snacks.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Potato Chips",
        description: "Crispy salted potato chips",
        price: 30,
        shopId: localGrocery.id,
        categoryId: snacks.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Instant Noodles",
        description: "Quick and easy instant noodles",
        price: 70,
        shopId: localGrocery.id,
        categoryId: snacks.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Dishwashing Liquid",
        description: "Lemon scented dishwashing liquid",
        price: 110,
        shopId: localGrocery.id,
        categoryId: household.id,
      },
    }),

    prisma.product.create({
      data: {
        name: "Laundry Detergent 2kg",
        description: "Powerful detergent for everyday washing",
        price: 240,
        shopId: localGrocery.id,
        categoryId: household.id,
      },
    }),
  ]);

  // -------------------------
  // INVENTORY
  // -------------------------
  const inventoryQuantities = [
    50,
    35,
    20,
    40,
    15,
    60,
    45,
    30,
    18,
    25,
  ];

  for (let i = 0; i < products.length; i++) {
    await prisma.inventory.create({
      data: {
        productId: products[i].id,
        quantity: inventoryQuantities[i],
        lowStockLimit: 5,
      },
    });
  }

  console.log("✅ LocalKart seed completed successfully!");
  console.log(`👤 Users: 5`);
  console.log(`🏪 Shops: 2`);
  console.log(`📂 Categories: 4`);
  console.log(`🛒 Products: ${products.length}`);
  console.log(`📦 Inventory records: ${products.length}`);
  console.log(`🔐 Demo password: LocalKart@123`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });