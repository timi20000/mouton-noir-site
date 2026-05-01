"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Clock3, MapPin, Phone, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteData } from "@/components/site-data";

const navItems = [
  { label: "Concept", href: "/#concept" },
  { label: "Cuisine", href: "/#signature" },
  { label: "Photos", href: "/photos" },
  { label: "Menu", href: "/menu" },
  { label: "Horaires", href: "/#horaires" },
  { label: "Adresse", href: "/#adresse" }
];

export default function HomePage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    restDelta: 0.001
  });

  const ldJson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: siteData.name,
      description:
        "Bar-restaurant sous la halle de Vergt, cuisine de saison, produits frais et locaux, terrasse conviviale.",
      telephone: siteData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Place de la Halle",
        addressLocality: "Vergt",
        postalCode: "24380",
        addressRegion: "Dordogne",
        addressCountry: "FR"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteData.coordinates.latitude,
        longitude: siteData.coordinates.longitude
      },
      url: siteData.mapUrl,
      servesCuisine: ["Francaise", "Cuisine de saison"],
      openingHours: ["Mo 10:00-15:00", "Tu 10:00-15:00", "Th 10:00-15:00", "Fr 09:00-22:00", "Sa 10:00-22:00", "Su 10:00-22:00"],
      priceRange: "€€"
    }),
    []
  );

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progressScaleX }} />
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />
      <div className="ambient ambient-3" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      <SiteHeader items={navItems} />

      <section className="hero">
        <div className="hero-media">
          {siteData.heroImages.map((src, index) => (
            <motion.div
              key={src}
              className={`hero-img hero-img-${index + 1}`}
              initial={{ opacity: 0, scale: 1.06, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.2 + index * 0.22,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Image
                src={src}
                alt={siteData.heroAlts[index] ?? "Restaurant Le Mouton Noir a Vergt"}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 1040px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>

        <div className="hero-content">
          <motion.p className="kicker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {siteData.tagline}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            Le Mouton Noir
            <br />
            {siteData.seoTagline}
          </motion.h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            Restaurant a Vergt, Le Mouton Noir rassemble dejeuner, diner et moments entre amis autour d'une cuisine de saison Dordogne,
            de produits frais, de produits locaux Vergt, de cocktails, boissons et glaces.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <a href="#horaires" className="btn-primary">
              Reserver une table <ArrowUpRight size={16} />
            </a>
            <a href="/menu" className="btn-primary">
              Voir le menu <ArrowUpRight size={16} />
            </a>
            <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} className="btn-ghost">
              Appeler
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatedSection id="concept" className="section two-col">
        <div>
          <p className="kicker">Concept</p>
          <h2>Une table conviviale au coeur de Vergt</h2>
          <p className="section-subtitle">
            Ce bar-restaurant a Vergt est installe sous la halle et propose une ambiance chaleureuse, une terrasse vivante et une vraie
            cuisine de partage.
          </p>
        </div>
        <div className="info-cards">
          <article>
            <MapPin size={18} />
            <h3>Restaurant sous la halle de Vergt</h3>
            <p>{siteData.address}</p>
          </article>
          <article>
            <Clock3 size={18} />
            <h3>Dejeuner, diner, moments entre amis</h3>
            <p>Produits frais, terroir et inspirations du monde.</p>
          </article>
          <article>
            <Phone size={18} />
            <h3>Contact direct</h3>
            <p>{siteData.phone}</p>
          </article>
        </div>
      </AnimatedSection>

      <AnimatedSection id="signature" className="section">
        <SectionTitle
          kicker="Cuisine"
          title="Cuisine de saison et produits locaux"
          subtitle="Restaurant en Dordogne: plats du terroir, inspirations du monde, cocktails, boissons et glaces."
        />
        <div className="menu-grid">
          {siteData.signatureDishes.map((dish, index) => (
            <Link key={dish.name} href="/menu" className="dish-link" aria-label={`Voir le menu complet pour ${dish.name}`}>
              <motion.article
                className="dish-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <div className="dish-top">
                  <h3>{dish.name}</h3>
                  <span>{dish.price}</span>
                </div>
                <p>{dish.description}</p>
              </motion.article>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="galerie" className="section gallery-section">
        <SectionTitle
          kicker="Terrasse"
          title="Terrasse sous la halle"
          subtitle="Le Mouton Noir, restaurant a Vergt, prolonge l'experience dehors dans une atmosphere conviviale."
        />
        <div className="gallery-grid">
          {siteData.gallery.map((src, index) => (
            <Reveal key={src} delay={index * 0.08} className={`gallery-item gallery-item-${index + 1}`}>
              <Image
                src={src}
                alt={siteData.galleryAlts[index] ?? "Bar-restaurant Le Mouton Noir en Dordogne"}
                fill
                loading="lazy"
                sizes="(max-width: 1040px) 100vw, 50vw"
              />
            </Reveal>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="avis" className="section testimonials">
        <SectionTitle kicker="Avis" title="Avis clients" subtitle="Apprécie pour son cadre sous la halle, son service chaleureux, sa cuisine généreuse, ses produits frais et son bon rapport qualité/prix." />
        <div className="quote-grid">
          {siteData.testimonials.map((item) => (
            <article key={item.name}>
              <Star size={16} />
              <p>"{item.quote}"</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
          <article>
            <Star size={16} />
            <p>"Note Google autour de 4,8/5 selon les annuaires synchronises avec la fiche locale."</p>
            <strong>Reputation en ligne</strong>
            <span>Donnee indicative a verifier sur Google Maps</span>
          </article>
        </div>
      </AnimatedSection>

      <AnimatedSection id="horaires" className="section reserve">
        <h2>Horaires et réservation</h2>
        <div className="hours-table" role="table" aria-label="Horaires d'ouverture">
          <div className="hours-row" role="row">
            <span role="cell">Lundi</span>
            <span role="cell">10h-15h</span>
          </div>
          <div className="hours-row" role="row">
            <span role="cell">Mardi</span>
            <span role="cell">10h-15h</span>
          </div>
          <div className="hours-row" role="row">
            <span role="cell">Mercredi</span>
            <span role="cell">Fermé</span>
          </div>
          <div className="hours-row" role="row">
            <span role="cell">Jeudi</span>
            <span role="cell">10h-15h</span>
          </div>
          <div className="hours-row" role="row">
            <span role="cell">Vendredi</span>
            <span role="cell">9h-22h</span>
          </div>
          <div className="hours-row" role="row">
            <span role="cell">Samedi</span>
            <span role="cell">10h-22h</span>
          </div>
          <div className="hours-row" role="row">
            <span role="cell">Dimanche</span>
            <span role="cell">10h-22h</span>
          </div>
        </div>
        <p>Horaires susceptibles de varier, pensez à appeler avant votre venue.</p>
        <div className="reserve-links">
          <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} className="btn-primary">
            Appeler
          </a>
          <a href={siteData.mapUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            Itineraire
          </a>
        </div>
      </AnimatedSection>

      <AnimatedSection id="adresse" className="section two-col practicals">
        <div>
          <p className="kicker">Infos pratiques</p>
          <h2>Adresse et accès</h2>
          <p className="section-subtitle">
            Le Mouton Noir, bar-restaurant à Vergt en Dordogne, vous accueille au 1 Place de la Halle, en coeur de village.
          </p>
          <div className="practical-links">
            <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} className="btn-primary">
              Appeler
            </a>
            <a href={siteData.mapUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              Itineraire
            </a>
          </div>
          <p className="section-subtitle">Telephone: {siteData.phone}</p>
        </div>
        <div className="map-wrap">
          {!mapLoaded ? (
            <div className="map-fallback">
              <p>La carte Google peut être bloquée dans certains navigateurs intégrés.</p>
              <a href={siteData.mapUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Ouvrir la carte
              </a>
            </div>
          ) : null}
          <iframe
            title="Carte Google Maps Le Mouton Noir Vergt"
            src={siteData.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
          />
        </div>
      </AnimatedSection>

      <SiteFooter />
    </main>
  );
}
