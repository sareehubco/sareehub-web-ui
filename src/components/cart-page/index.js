"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeItem, setQuantity } from "@/store/slice/CartSlice";
import { toggleItem } from "@/store/slice/WishlistSlice";
import { clearBuyNowItem } from "@/store/buyNowItem";
import { ALL_PRODUCTS } from "@/app/collections/all-products";
import styles from "./index.module.css";

const TAX_RATE = 0.12;

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const wishlistSlugs = useAppSelector((state) => new Set(state.wishlist.items.map((item) => item.slug)));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  const recommendations = useMemo(() => {
    const cartSlugs = new Set(items.map((item) => item.slug));
    return ALL_PRODUCTS.filter((product) => !cartSlugs.has(product.slug)).slice(0, 4);
  }, [items]);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</h1>
        <Link href="/sarees" className={styles.continueLink}>
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link href="/sarees">Shop All Sarees</Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.itemList}>
            {items.map((item) => (
              <div className={styles.itemCard} key={item.slug}>
                <div className={styles.itemImageWrap}>
                  <Image src={item.image} alt={item.name} fill sizes="90px" style={{ objectFit: "cover" }} />
                </div>

                <div className={styles.itemInfo}>
                  <div>
                    <Link href={`/sarees/${item.slug}`} className={styles.itemName}>
                      {item.name}
                    </Link>
                    <div className={styles.itemMeta}>Color: {capitalize(item.color)}</div>
                  </div>

                  <div className={styles.itemControls}>
                    <span className={styles.qtyControl}>
                      <button
                        type="button"
                        className={styles.qtyButton}
                        onClick={() => dispatch(setQuantity({ slug: item.slug, quantity: item.quantity - 1 }))}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.qtyButton}
                        onClick={() => dispatch(setQuantity({ slug: item.slug, quantity: item.quantity + 1 }))}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </span>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeItem(item.slug))}
                    >
                      <TrashIcon /> Remove
                    </button>
                  </div>
                </div>

                <div className={styles.itemPriceCol}>
                  <div className={styles.itemLineTotal}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                  {item.quantity > 1 && (
                    <div className={styles.itemUnitPrice}>₹{item.price.toLocaleString("en-IN")} each</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Tax</span>
              <span>₹{tax.toLocaleString("en-IN")}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutBtn} onClick={() => clearBuyNowItem()}>
              Proceed to Checkout
            </Link>

            <div className={styles.trustList}>
              <div className={styles.trustItem}><LockIcon /> Secure Payments</div>
              <div className={styles.trustItem}><RefreshIcon /> Easy Returns</div>
              <div className={styles.trustItem}><TruckIcon /> Free Shipping on orders above ₹999</div>
            </div>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <section className={styles.recommendations}>
          <h2>You may also like</h2>
          <div className={styles.recGrid}>
            {recommendations.map((product) => {
              const isWishlisted = wishlistSlugs.has(product.slug);
              return (
                <div key={product.slug} className={styles.recCard}>
                  <button
                    type="button"
                    className={`${styles.recWishlistBtn} ${isWishlisted ? styles.recWishlistBtnActive : ""}`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() =>
                      dispatch(
                        toggleItem({
                          slug: product.slug,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          color: product.color,
                        })
                      )
                    }
                  >
                    <HeartIcon filled={isWishlisted} />
                  </button>
                  <Link href={`/sarees/${product.slug}`} className={styles.recCardLink}>
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
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default CartPage;

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="7" width="14" height="10" rx="1" />
      <path d="M15 10h4l3 3v4h-7z" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}
