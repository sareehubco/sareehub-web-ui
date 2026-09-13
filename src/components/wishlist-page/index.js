"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slice/CartSlice";
import { removeItem } from "@/store/slice/WishlistSlice";
import { ALL_PRODUCTS } from "@/app/collections/all-products";
import styles from "./index.module.css";

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);

  const recommendations = useMemo(() => {
    const wishlistSlugs = new Set(items.map((item) => item.slug));
    return ALL_PRODUCTS.filter((product) => !wishlistSlugs.has(product.slug)).slice(0, 4);
  }, [items]);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Your Wishlist ({items.length} items)</h1>
        <Link href="/sarees" className={styles.continueLink}>
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Your wishlist is empty.</p>
          <Link href="/sarees">Shop All Sarees</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div className={styles.card} key={item.slug}>
              <button
                type="button"
                className={styles.removeBtn}
                aria-label="Remove from wishlist"
                onClick={() => dispatch(removeItem(item.slug))}
              >
                <HeartIcon filled />
              </button>
              <Link href={`/sarees/${item.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrap}>
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                </div>
                <div className={styles.cardName}>{item.name}</div>
                <div className={styles.cardMeta}>Color: {capitalize(item.color)}</div>
                <div className={styles.cardPrice}>₹{item.price.toLocaleString("en-IN")}</div>
              </Link>
              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={() =>
                  dispatch(
                    addItem({
                      slug: item.slug,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      color: item.color,
                      quantity: 1,
                    })
                  )
                }
              >
                <BagIcon /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <section className={styles.recommendations}>
          <h2>You may also like</h2>
          <div className={styles.recGrid}>
            {recommendations.map((product) => (
              <Link key={product.slug} href={`/sarees/${product.slug}`} className={styles.recCard}>
                <div className={styles.recImageWrap}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 900px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.recName}>{product.name}</div>
                <div className={styles.recPrice}>₹{product.price.toLocaleString("en-IN")}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default WishlistPage;

function HeartIcon({ filled = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
