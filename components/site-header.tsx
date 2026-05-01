"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteData } from "@/components/site-data";

type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  items: NavItem[];
};

export function SiteHeader({ items }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <>
      <header className="topbar">
        <Link href="/">{siteData.name}</Link>
        <nav>
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
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
              <div className="mobile-panel-list">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22, delay: index * 0.04 }}
                  >
                    <Link href={item.href} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
