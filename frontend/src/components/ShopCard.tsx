import type { Shop } from "../types";
import { Button } from "./Button";

type ShopCardProps = {
  shop: Shop;
  onView?: (shop: Shop) => void;
};

export function ShopCard({ shop, onView }: ShopCardProps) {
  const open = shop.isOpen !== false;
  return (
    <article className="shop-card">
      <div className="shop-art" aria-hidden="true"><span>{shop.name.slice(0, 1)}</span></div>
      <div className="shop-card__body">
        <div className="card-heading">
          <div>
            <p className="eyebrow">{shop.category ?? "Local store"}</p>
            <h3>{shop.name}</h3>
          </div>
          {shop.rating ? <span className="rating">★ {shop.rating.toFixed(1)}</span> : null}
        </div>
        <p className="muted">{shop.description ?? "Shop local, discover something useful."}</p>
        <p className="location"><span aria-hidden="true">+</span> {shop.address}{shop.distance ? ` · ${shop.distance}` : ""}</p>
        <div className="card-footer">
          <span className={open ? "status status--open" : "status status--closed"}>{open ? "Open now" : "Closed"}</span>
          <Button variant="ghost" className="text-button" onClick={() => onView?.(shop)}>View shop <span aria-hidden="true">→</span></Button>
        </div>
      </div>
    </article>
  );
}
