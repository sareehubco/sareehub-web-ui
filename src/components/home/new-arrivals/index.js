import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

const PRODUCTS = [
  { name: "Maroon Kanjivaram Silk", price: "₹6,999", image: "/images/newArrivals/NewArrival1.png", position: "85% center" },
  { name: "Bridal Red Silk Saree", price: "₹12,999", image: "/images/newArrivals/NewArrival2.png", position: "90% top" },
  { name: "Pastel Green Organza", price: "₹4,499", image: "/images/newArrivals/NewArrival3.png", position: "85% top" },
  { name: "Ivory Gold Silk Saree", price: "₹7,499", image: "/images/newArrivals/NewArrival4.png", position: "80% top" },
  { name: "Handwoven Zari Saree", price: "₹8,999", image: "/images/newArrivals/NewArrival5.png", position: "15% center" },
  { name: "Dusty Pink Cotton Saree", price: "₹3,499", image: "/images/newArrivals/NewArrival6.png", position: "88% top" },
];

const NewArrivals = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>New Arrivals</h2>
        <Link href="/new-arrivals" className={styles.viewAll}>
          View All →
        </Link>
      </div>

      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <div className={styles.card} key={product.name}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 16vw"
                style={{ objectFit: "cover", objectPosition: product.position }}
              />
              <button type="button" className={styles.wishlistBtn} aria-label="Add to wishlist">
                <HeartIcon />
              </button>
            </div>
            <div className={styles.info}>
              <div>
                <h3>{product.name}</h3>
                <div className={styles.price}>{product.price}</div>
              </div>
              <button type="button" className={styles.cartBtn} aria-label="Add to cart">
                <CartIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

function HeartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
