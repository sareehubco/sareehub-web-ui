import styles from "./index.module.css";

const BRANDS = ["VOGUE", "BAZAAR", "FEMINA", "THE HINDU", "LIFESTYLE"];

const FeaturedIn = () => {
  return (
    <section className={styles.section}>
      <span className={styles.label}>As Featured In</span>
      {BRANDS.map((brand) => (
        <span className={styles.brand} key={brand}>
          {brand}
        </span>
      ))}
    </section>
  );
};

export default FeaturedIn;
