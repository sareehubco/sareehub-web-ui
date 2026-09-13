"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slice/CartSlice";
import { removeItem } from "@/store/slice/WishlistSlice";
import { useAllProducts } from "@/hooks/useAllProducts";
import HeartIcon from "@/icons/heart-icon";
import BagIcon from "@/icons/bag-icon";
import { capitalize, formatPrice } from "@/lib/format";
import styles from "./index.module.css";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);
  const allProducts = useAllProducts();

  const recommendations = useMemo(() => {
    const wishlistSlugs = new Set(items.map((item) => item.slug));
    return allProducts.filter((product) => !wishlistSlugs.has(product.slug)).slice(0, 4);
  }, [items, allProducts]);

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
                <HeartIcon size={16} filled />
              </button>
              <Link href={`/sarees/${item.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrap}>
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                </div>
                <div className={styles.cardName}>{item.name}</div>
                <div className={styles.cardMeta}>Color: {capitalize(item.color)}</div>
                <div className={styles.cardPrice}>{formatPrice(item.price)}</div>
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
                <BagIcon size={15} /> Add to Cart
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
                <div className={styles.recPrice}>{formatPrice(product.price)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default WishlistPage;
