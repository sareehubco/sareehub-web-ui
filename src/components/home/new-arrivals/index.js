import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/icons/heart-icon";
import BagIcon from "@/icons/bag-icon";
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
                <HeartIcon size={15} />
              </button>
            </div>
            <div className={styles.info}>
              <div>
                <h3>{product.name}</h3>
                <div className={styles.price}>{product.price}</div>
              </div>
              <button type="button" className={styles.cartBtn} aria-label="Add to cart">
                <BagIcon size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
