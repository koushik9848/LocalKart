import { Button } from "./Button";

type PromoBannerProps = { shopCount: number; onBrowse: () => void };

export function PromoBanner({ shopCount, onBrowse }: PromoBannerProps) {
  return <section className="promo-banner" aria-label="LocalKart promotion">
    <div className="promo-copy"><p className="kicker">LocalKart quick picks</p><h2>Shop local.<br /><em>Get it closer.</em></h2><p>Fresh essentials, trusted neighbourhood shops, and one easy basket.</p><Button variant="secondary" onClick={onBrowse}>Browse today's picks <span aria-hidden="true">→</span></Button></div>
    <div className="promo-art" aria-hidden="true"><span className="promo-sticker">{shopCount || "2"}<small>shops<br />nearby</small></span><span className="promo-basket">LK</span></div>
  </section>;
}
