import { useState } from "react";
import { Button } from "./Button";

type HeaderProps = {
  location: string;
  cartCount: number;
  onCart: () => void;
};

const links = [
  { label: "Discover", href: "#discover" },
  { label: "Shops", href: "#shops" },
  { label: "Products", href: "#products" },
];

export function Header({ location, cartCount, onCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return <header className="topbar">
    <a className="brand" href="#discover" onClick={closeMenu} aria-label="LocalKart home"><span className="brand-mark">LK</span><span>Local<span>Kart</span></span></a>
    <div className="location-chip"><span aria-hidden="true">⌖</span><span><small>Delivering to</small>{location}</span></div>
    <nav id="primary-navigation" className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Primary navigation">
      {links.map((link, index) => <a className={index === 0 ? "is-current" : undefined} href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>)}
    </nav>
    <div className="header-actions">
      <Button variant="ghost" className="cart-button" onClick={onCart} aria-label={`Cart with ${cartCount} items`}><span aria-hidden="true">▱</span> Cart <b>{cartCount}</b></Button>
      <Button variant="ghost" iconOnly className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}><span aria-hidden="true">{menuOpen ? "×" : "≡"}</span></Button>
    </div>
  </header>;
}