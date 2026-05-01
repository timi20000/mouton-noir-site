import Image from "next/image";
import { Reveal } from "@/components/reveal";
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

const galleryImages = [...siteData.heroImages, ...siteData.gallery];
const galleryAlts = [...siteData.heroAlts, ...siteData.galleryAlts];

export default function PhotosPage() {
  return (
    <main className="subpage">
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />
      <div className="ambient ambient-3" />

      <SiteHeader items={navItems} />

      <section className="subpage-hero">
        <p className="kicker">Galerie</p>
        <h1>Photos du restaurant</h1>
        <p className="lede">
          Découvrez l'univers du Mouton Noir: terrasse sous la halle, service, ambiance et cuisine de saison.
        </p>
      </section>

      <section className="section photo-grid-page">
        {galleryImages.map((src, index) => (
          <Reveal key={`${src}-${index}`} delay={(index % 6) * 0.05} className={`photo-tile photo-tile-${(index % 6) + 1}`}>
            <Image
              src={src}
              alt={galleryAlts[index] ?? "Photos du restaurant Le Mouton Noir"}
              fill
              loading="lazy"
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Reveal>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
