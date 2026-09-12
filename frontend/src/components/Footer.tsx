const exploreLinks = [
  { label: "Discover", href: "#discover" },
  { label: "Shops", href: "#shops" },
  { label: "Products", href: "#products" },
];

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-intro">
        <a className="brand footer-brand" href="#discover" aria-label="LocalKart home"><span className="brand-mark">LK</span><span>Local<span>Kart</span></span></a>
        <p>Everyday essentials from the shops that make your neighbourhood feel like home.</p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <p className="footer-label">Explore</p>
        {exploreLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </nav>
      <div className="footer-nav footer-note">
        <p className="footer-label">Local, by design</p>
        <p>Built around nearby shops, useful products, and the people who keep a neighbourhood moving.</p>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} LocalKart</span><a href="#discover">Back to top <span aria-hidden="true">↑</span></a></div>
  </footer>;
}