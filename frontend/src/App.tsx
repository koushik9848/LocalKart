import { useEffect, useMemo, useState } from "react";
import { loadCatalog } from "./api";
import { CategoryList } from "./components/CategoryList";
import { Button } from "./components/Button";
import { CartPage, type CartLine } from "./components/CartPage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { PromoBanner } from "./components/PromoBanner";
import { SearchBar } from "./components/SearchBar";
import { ShopCard } from "./components/ShopCard";
import type { Category, Product, Shop } from "./types";

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(() => window.location.hash === "#cart");
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCatalog()
      .then((catalog) => {
        setShops(catalog.shops);
        setProducts(catalog.products);
        setCategories(catalog.categories);
        setUsingDemoData(catalog.usingDemoData);
      })
      .catch(() => setError("We could not load the local catalogue."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const syncView = () => setCartOpen(window.location.hash === "#cart");
    window.addEventListener("hashchange", syncView);
    window.addEventListener("popstate", syncView);
    return () => {
      window.removeEventListener("hashchange", syncView);
      window.removeEventListener("popstate", syncView);
    };
  }, []);

  const matchingProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
      const matchesQuery = !normalized || [product.name, product.shopName, product.categoryName, product.description].some((value) => value?.toLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [products, query, selectedCategory]);

  const matchingShops = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return shops.filter((shop) => !normalized || [shop.name, shop.address, shop.category, shop.description].some((value) => value?.toLowerCase().includes(normalized)));
  }, [shops, query]);

  const selectedCategoryName = categories.find((category) => category.id === selectedCategory)?.name;
  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0);

  const openCart = () => {
    setCartOpen(true);
    window.history.pushState({}, "", "#cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeCart = () => {
    setCartOpen(false);
    window.history.pushState({}, "", "#discover");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCartLines((lines) => {
      const existing = lines.find((line) => line.product.id === product.id);
      if (existing) return lines.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line);
      return [...lines, { product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId: number, amount: number) => {
    setCartLines((lines) => lines.flatMap((line) => line.product.id === productId ? (line.quantity + amount > 0 ? [{ ...line, quantity: line.quantity + amount }] : []) : [line]));
  };

  const removeFromCart = (productId: number) => setCartLines((lines) => lines.filter((line) => line.product.id !== productId));

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    window.setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return <div className="app-shell">
    <Header location={shops[0]?.address ?? "Kukatpally, Hyderabad"} cartCount={cartCount} onCart={openCart} />

    {cartOpen ? <main id="cart"><CartPage lines={cartLines} onBack={closeCart} onIncrease={(productId) => changeQuantity(productId, 1)} onDecrease={(productId) => changeQuantity(productId, -1)} onRemove={removeFromCart} /></main> : <main id="discover">
      <section className="search-dock" aria-label="Catalogue search"><div><p className="kicker">Local shopping, simplified</p><h1>What are you looking for today?</h1></div><SearchBar value={query} onChange={setQuery} loading={loading} /></section>
      <PromoBanner shopCount={shops.length} onBrowse={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      <section className="category-section" aria-label="Browse categories"><div className="section-heading"><div><p className="kicker">Browse by need</p><h2>Shop by category</h2></div><span>{categories.length} categories</span></div><CategoryList categories={categories} selectedId={selectedCategory} onSelect={handleCategorySelect} /></section>

      {usingDemoData && !loading ? <p className="demo-note">Showing the seed catalogue while the API is offline. Connect <code>VITE_API_URL</code> for live inventory.</p> : null}
      {error ? <div className="state-panel"><strong>Catalogue unavailable</strong><p>Try refreshing once the catalogue service is available.</p></div> : null}
      {loading ? <div className="state-panel"><span className="loading-line" /><span className="loading-line loading-line--short" /><p>Finding the best local picks...</p></div> : null}

      {!loading && !error ? <>
        <section className="content-section" id="shops"><div className="section-heading"><div><p className="kicker">Around you</p><h2>Popular local shops</h2></div><span>{matchingShops.length} places</span></div>{matchingShops.length ? <div className="shop-grid">{matchingShops.map((shop) => <ShopCard key={shop.id} shop={shop} onView={(item) => setQuery(item.name)} />)}</div> : <div className="empty-state"><strong>No shops found</strong><p>Try clearing your search to see nearby shops.</p></div>}</section>
        <section className="content-section products-section" id="products"><div className="section-heading"><div><p className="kicker">Fast-moving favourites</p><h2>{selectedCategoryName ?? "Popular near you"}</h2></div><span>{matchingProducts.length} products</span></div>{matchingProducts.length ? <div className="product-grid">{matchingProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div> : <div className="empty-state"><strong>No products found</strong><p>Try another search or clear the category filter.</p><Button onClick={() => { setQuery(""); setSelectedCategory(null); }}>Clear filters</Button></div>}</section>
      </> : null}
    </main>}
    <Footer />
  </div>;
}
