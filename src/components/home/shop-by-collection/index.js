import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/icons/arrow-icon";
import styles from "./index.module.css";

const COLLECTIONS = [
  { label: "Bridal Collection", href: "/collections/bridal", image: "/images/collections/bridal.png", tone: "#4f1420" },
  { label: "New Arrivals", href: "/new-arrivals", image: "/images/collections/newarrival.png", tone: "#163a2d" },
  { label: "Festive Collection", href: "/collections/festive", image: "/images/collections/festive.png", tone: "#8a6323" },
  { label: "Party Wear", href: "/collections/party-wear", image: "/images/collections/party.png", tone: "#241536" },
  { label: "Daily Wear", href: "/collections/daily-wear", image: "/images/collections/dailywear.png", tone: "#16323a" },
  { label: "Handloom Treasures", href: "/collections/handloom", image: "/images/collections/handloom.png", tone: "#2f6b52" },
];

const ShopByCollection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Shop by Collection</h2>
        <Link href="/collections" className={styles.viewAll}>
          View All →
        </Link>
      </div>

      <div className={styles.grid}>
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.label}
            href={collection.href}
            className={styles.card}
            style={{ background: collection.tone }}
          >
            {collection.image && (
              <Image
                src={collection.image}
                alt={collection.label}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 16vw"
                style={{ objectFit: "cover" }}
              />
            )}
            <span className={styles.cardLabel}>
              {collection.label}
              <span className={styles.cardArrow} aria-hidden="true">
                <ArrowIcon size={16} />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCollection;
