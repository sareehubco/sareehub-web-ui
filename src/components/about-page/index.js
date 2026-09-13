import Image from "next/image";
import styles from "./index.module.css";

const FEATURES = [
  {
    key: "authentic",
    title: "Authentic Products",
    description: "Sourced directly from real weavers.",
    icon: <ShieldIcon />,
  },
  {
    key: "artisans",
    title: "Support Artisans",
    description: "Empowering local weaving communities.",
    icon: <HandsIcon />,
  },
  {
    key: "quality",
    title: "Quality Assured",
    description: "Carefully curated collections.",
    icon: <BadgeIcon />,
  },
  {
    key: "sustainable",
    title: "Sustainable Fashion",
    description: "Preserving our textile heritage.",
    icon: <LeafIcon />,
  },
];

const AboutPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <h1>About SareeHub</h1>
          <p className={styles.tagline}>More than a brand, a celebration of our roots.</p>

          <p className={styles.body}>
            At SareeHub, we believe a saree is more than just a garment — it&apos;s a story of tradition, craftsmanship,
            and timeless beauty. Our mission is to bring authentic handwoven and exquisite sarees from across India
            straight to your wardrobe, while supporting the artisans who keep this legacy alive.
          </p>

          <div className={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <div className={styles.feature} key={feature.key}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageColumn}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/collections/bridal.png"
              alt="Woman draped in a traditional Kanjivaram saree"
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.quoteCard}>
            <p>&ldquo;When you wear a saree, you wear a legacy.&rdquo;</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function HandsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5 7 22l5-3 5 3-2-7.5" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21c9 0 14-5 14-14V4h-3C7 4 5 12 5 21Z" />
      <path d="M5 21c3-6 6-9 12-12" />
    </svg>
  );
}
