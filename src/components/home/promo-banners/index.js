import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

const PromoBanners = () => {
  return (
    <section className={styles.section}>
      <Link href="/collections/handloom" className={styles.banner}>
        <Image
          src="/images/banner-handloom.jpg"
          alt="Handloom Treasures — Woven With Heritage. Pure. Authentic. Timeless."
          fill
          sizes="(max-width: 900px) 100vw, 66vw"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <Link href="/collections/daily-wear" className={styles.banner}>
        <Image
          src="/images/banner-everyday.jpg"
          alt="Everyday Elegance — Grace In Everyday Life. Lightweight sarees for your beautiful everyday."
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </Link>
    </section>
  );
};

export default PromoBanners;
