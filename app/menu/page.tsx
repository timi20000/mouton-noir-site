import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteData } from "@/components/site-data";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Photos", href: "/photos" },
  { label: "Menu", href: "/menu" },
  { label: "Horaires", href: "/#horaires" },
  { label: "Adresse", href: "/#adresse" }
];

const drinks = [
  { name: "Cocktail signature", desc: "Creation maison selon la saison", price: "11€" },
  { name: "Spritz du marche", desc: "Version fraiche et locale", price: "9€" },
  { name: "Verre de vin", desc: "Selection de vignerons en rotation", price: "6€" }
];

const sweet = [
  { name: "Glace artisanale", desc: "Parfum du moment", price: "4€" },
  { name: "Cafe gourmand", desc: "Mini douceurs et cafe", price: "8€" },
  { name: "Dessert maison", desc: "Inspiration du chef", price: "7€" }
];

export default function MenuPage() {
  return (
    <main className="subpage">
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />
      <div className="ambient ambient-3" />

      <SiteHeader items={navItems} />

      <section className="subpage-hero">
        <p className="kicker">Carte</p>
        <h1>Menu du Mouton Noir</h1>
        <p className="lede">
          Une carte vivante entre terroir, produits locaux et inspirations du monde, du déjeuner au dîner.
        </p>
      </section>

      <section className="section menu-layout">
        <article className="menu-category">
          <h2>Plats de saison</h2>
          {siteData.signatureDishes.map((dish) => (
            <div key={dish.name} className="menu-line">
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
              </div>
              <span>{dish.price}</span>
            </div>
          ))}
        </article>

        <article className="menu-category">
          <h2>Cocktails et boissons</h2>
          {drinks.map((item) => (
            <div key={item.name} className="menu-line">
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </article>

        <article className="menu-category">
          <h2>Glaces et douceurs</h2>
          {sweet.map((item) => (
            <div key={item.name} className="menu-line">
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
              <span>{item.price}</span>
            </div>
          ))}
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
