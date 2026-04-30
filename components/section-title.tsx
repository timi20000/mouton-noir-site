type SectionTitleProps = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  return (
    <div className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}
