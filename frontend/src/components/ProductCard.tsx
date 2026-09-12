import type { Product } from "../types";
import { Button } from "./Button";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const available = product.quantity == null || product.quantity > 0;
  return (
    <article className="product-card">
      <div className="product-art" aria-hidden="true"><span>{product.name.slice(0, 1)}</span></div>
      <div className="product-card__body">
        <div className="product-meta"><span>{product.categoryName}</span><span className={available ? "availability" : "availability availability--out"}>{available ? "In stock" : "Sold out"}</span></div>
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <p className="shop-label">{product.shopName}</p>
        <div className="card-footer"><strong>₹{product.price.toLocaleString("en-IN")}</strong><Button variant="primary" className="add-button" disabled={!available} onClick={() => onAdd?.(product)}>{available ? "Add" : "Unavailable"}<span aria-hidden="true">+</span></Button></div>
      </div>
    </article>
  );
}
