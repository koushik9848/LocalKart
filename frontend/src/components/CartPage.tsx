import { Button } from "./Button";
import type { Product } from "../types";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartPageProps = {
  lines: CartLine[];
  onBack: () => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
};

export function CartPage({ lines, onBack, onIncrease, onDecrease, onRemove }: CartPageProps) {
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce((total, line) => total + line.product.price * line.quantity, 0);

  return <section className="cart-page" aria-labelledby="cart-title">
    <div className="cart-page__heading"><div><p className="kicker">Your basket</p><h1 id="cart-title">Cart <span>({itemCount} items)</span></h1></div><Button variant="outline" onClick={onBack}>Continue shopping <span aria-hidden="true">→</span></Button></div>
    {lines.length === 0 ? <div className="cart-empty"><div className="cart-empty__icon" aria-hidden="true">▱</div><h2>Your cart is empty</h2><p>Add a few local favourites and they will show up here.</p><Button onClick={onBack}>Browse products</Button></div> : <div className="cart-layout">
      <div className="cart-lines">{lines.map((line) => <article className="cart-line" key={line.product.id}>
        <div className="cart-line__art" aria-hidden="true">{line.product.name.slice(0, 1)}</div>
        <div className="cart-line__info"><p className="product-meta">{line.product.categoryName}</p><h2>{line.product.name}</h2><p className="muted">{line.product.shopName}</p><button type="button" className="cart-remove" onClick={() => onRemove(line.product.id)}>Remove</button></div>
        <div className="cart-line__actions"><strong>₹{(line.product.price * line.quantity).toLocaleString("en-IN")}</strong><div className="quantity-control"><Button variant="outline" iconOnly onClick={() => onDecrease(line.product.id)} aria-label={`Decrease ${line.product.name}`}>−</Button><span aria-label={`${line.quantity} in cart`}>{line.quantity}</span><Button variant="outline" iconOnly onClick={() => onIncrease(line.product.id)} aria-label={`Increase ${line.product.name}`}>+</Button></div></div>
      </article>)}</div>
      <aside className="cart-summary"><p className="kicker">Order summary</p><div><span>Items ({itemCount})</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div><div><span>Delivery</span><strong className="summary-free">Free</strong></div><div className="summary-total"><span>Total</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div><Button variant="secondary" className="checkout-button" disabled>Checkout coming soon</Button><p className="summary-note">Checkout will be available when the LocalKart order API is connected.</p></aside>
    </div>}
  </section>;
}
