import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const COLLECTIONS = [
  { title: "Bridal Collection", tagline: "For your big day", href: "/collections/bridal", image: "/images/collections/bridal.png" },
  { title: "Festive Collection", tagline: "Celebrate in style", href: "/collections/festive", image: "/images/collections/festive.png" },
  { title: "Party Wear", tagline: "Make a statement", href: "/collections/party-wear", image: "/images/collections/party.png" },
  { title: "Daily Wear", tagline: "Everyday elegance", href: "/collections/daily-wear", image: "/images/collections/dailywear.png" },
  { title: "Work Wear", tagline: "Grace at work", href: "/collections/work-wear", image: "/images/collections/workwear.png" },
  { title: "Handloom Treasures", tagline: "Rooted in tradition", href: "/collections/handloom", image: "/images/collections/handloom.png" },
];

export const metadata = {
  title: "Collections — SareeHub",
  description: "Celebrating every mood, moment and milestone with timeless sarees.",
};

export default function CollectionsPage() {
  return (
    <main>
      <section className={styles.pageHeader}>
        <Image
          src="/images/collections/collection.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.pageHeaderScrim} />
        <div className={styles.pageHeaderContent}>
          <h1>Collections</h1>
          <p>Celebrating every mood, moment and milestone with timeless sarees.</p>
        </div>
      </section>

      <section className={styles.grid}>
        {COLLECTIONS.map((collection) => (
          <Link key={collection.title} href={collection.href} className={styles.card}>
            {collection.image && (
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            )}
            <div className={styles.cardInfo}>
              <h3>{collection.title}</h3>
              <span className={styles.cardTagline}>{collection.tagline} →</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
