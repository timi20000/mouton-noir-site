import { siteData } from "@/components/site-data";

export function SiteFooter() {
  return (
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
  );
}
