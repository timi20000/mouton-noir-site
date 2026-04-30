"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Clock3, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { siteData } from "@/components/site-data";

const navItems = [
  { label: "Concept", href: "#concept" },
  { label: "Signature", href: "#signature" },
  { label: "Galerie", href: "#galerie" },
  { label: "Avis", href: "#avis" },
  { label: "Réserver", href: "#reserver" }
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    restDelta: 0.001
  });

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const ldJson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: siteData.name,
      description: siteData.description,
      telephone: siteData.phone,
      email: siteData.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Corgnac-sur-l'Isle",
        addressLocality: "Corgnac-sur-l'Isle",
        addressRegion: "Dordogne",
        postalCode: "24800",
        addressCountry: "FR"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteData.coordinates.latitude,
        longitude: siteData.coordinates.longitude
      },
      url: siteData.mapUrl,
      servesCuisine: "Française",
      priceRange: "€€",
      areaServed: "Dordogne",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
          opens: "19:00",
          closes: "22:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "19:00",
          closes: "23:00"
        }
      ]
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

      <header className="topbar">
        <p>{siteData.name}</p>
        <nav>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              className="mobile-backdrop"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22, delay: index * 0.04 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <section className="hero">
        <div className="hero-media">
          {siteData.heroImages.map((src, index) => (
            <motion.div
              key={src}
              className={`hero-img hero-img-${index + 1}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: index * 0.2 }}
            >
              <Image
                src={src}
                alt={siteData.heroAlts[index] ?? "Le Mouton Noir, restaurant de saison en Dordogne"}
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
            Restaurant de saison à Corgnac-sur-l'Isle, Dordogne
          </motion.h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            {siteData.description} Le restaurant accueille les amateurs de cuisine de saison à
            Corgnac-sur-l'Isle, au coeur de la Dordogne.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <a href="#reserver" className="btn-primary">
              Réserver une table <ArrowUpRight size={16} />
            </a>
            <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} className="btn-ghost">
              Appeler
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatedSection id="concept" className="section two-col">
        <div>
          <p className="kicker">Le concept</p>
          <h2>Concept, adresse et horaires du restaurant à Corgnac-sur-l'Isle</h2>
        </div>
        <div className="info-cards">
          <article>
            <MapPin size={18} />
            <h3>Adresse</h3>
            <p>{siteData.address}</p>
          </article>
          <article>
            <Clock3 size={18} />
            <h3>Horaires</h3>
            {siteData.openingHours.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
          <article>
            <Phone size={18} />
            <h3>Contact</h3>
            <p>{siteData.phone}</p>
            <p>{siteData.email}</p>
          </article>
        </div>
      </AnimatedSection>

      <AnimatedSection id="signature" className="section">
        <SectionTitle
          kicker="Cuisine de saison"
          title="Carte du restaurant: une cuisine de saison précise et vivante"
          subtitle="Produits du moment, cuisson juste et assaisonnement net en Dordogne."
        />
        <div className="menu-grid">
          {siteData.signatureDishes.map((dish, index) => (
            <motion.article
              key={dish.name}
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
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="galerie" className="section gallery-section">
        <SectionTitle
          kicker="Galerie"
          title="Galerie du restaurant Le Mouton Noir"
          subtitle="Lumière, matières et rythme de service: chaque détail compte."
        />
        <div className="gallery-grid">
          {siteData.gallery.map((src, index) => (
            <Reveal key={src} delay={index * 0.08} className={`gallery-item gallery-item-${index + 1}`}>
              <Image
                src={src}
                alt={siteData.galleryAlts[index] ?? "Galerie du restaurant Le Mouton Noir"}
                fill
                loading="lazy"
                sizes="(max-width: 1040px) 100vw, 50vw"
              />
            </Reveal>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="avis" className="section testimonials">
        <SectionTitle kicker="Avis" title="Avis clients du restaurant Le Mouton Noir" />
        <div className="quote-grid">
          {siteData.testimonials.map((item) => (
            <article key={item.name}>
              <Star size={16} />
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="reserver" className="section reserve">
        <h2>Réservation au restaurant Le Mouton Noir</h2>
        <p>Service attentionné, places limitées. Réservation recommandée 48h à l’avance.</p>
        <div className="reserve-links">
          <a href={`mailto:${siteData.email}`} className="btn-primary">
            Demander une réservation
          </a>
          <a href={siteData.mapUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            Ouvrir l’itinéraire
          </a>
        </div>
      </AnimatedSection>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {siteData.name}
        </p>
        <div>
          {siteData.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
