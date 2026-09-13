"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slice/CartSlice";
import { toggleItem } from "@/store/slice/WishlistSlice";
import { setBuyNowItem } from "@/store/buyNowItem";
import HeartIcon from "@/icons/heart-icon";
import LockIcon from "@/icons/lock-icon";
import RefreshIcon from "@/icons/refresh-icon";
import ShieldIcon from "@/icons/shield-icon";
import GlobeIcon from "@/icons/globe-icon";
import { capitalize, formatPrice } from "@/lib/format";
import styles from "./index.module.css";

const COLORS = [
  { key: "gold", hex: "#c9974b" },
  { key: "orange", hex: "#d97b29" },
  { key: "red", hex: "#c0392b" },
  { key: "green", hex: "#2f6b52" },
  { key: "blue", hex: "#2f5a8a" },
  { key: "purple", hex: "#6a3b8a" },
  { key: "maroon", hex: "#6b1d2c" },
  { key: "pink", hex: "#c76b8a" },
];

const TABS = [
  { key: "description", label: "Description" },
  { key: "fabric-care", label: "Fabric & Care" },
  { key: "shipping-returns", label: "Shipping & Returns" },
  { key: "reviews", label: "Reviews" },
];

const ProductDetail = ({ product, categoryMeta }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isWishlisted = useAppSelector((state) => state.wishlist.items.some((item) => item.slug === product.slug));
  // rating/reviewCount/stock/discountPercent/originalPrice/seller/sellerRating/sellerRatingCount
  // are merged onto `product` by ProductService.getProductBySlug — see src/api/ProductService.js.
  const { rating, reviewCount, stock, discountPercent, originalPrice, seller, sellerRating, sellerRatingCount } =
    product;
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [feedback, setFeedback] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <main>
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link> {">"}{" "}
        {categoryMeta && (
          <>
            <Link href={categoryMeta.href}>{categoryMeta.label}</Link> {">"}{" "}
          </>
        )}
        {product.name}
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {[0, 1, 2].map((i) => (
              <div className={styles.thumb} key={i}>
                <Image src={product.image} alt={product.name} fill sizes="80px" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.mainImageWrap}
            onClick={() => setIsZoomOpen(true)}
            aria-label="Zoom image"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 420px"
              style={{ objectFit: "cover" }}
            />
            <span className={styles.zoomHint} aria-hidden="true">
              <ZoomIcon />
            </span>
          </button>
        </div>

        <div className={styles.info}>
          <h1>{product.name}</h1>

          <div className={styles.ratingRow}>
            <StarIcon /> {rating} <span>({reviewCount} reviews)</span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
            <span className={styles.discountBadge}>{discountPercent}% OFF</span>
          </div>
          <p className={styles.taxNote}>Inclusive of all taxes</p>

          <div className={styles.sellerRow}>
            <span>
              Sold by <strong>{seller}</strong>
            </span>
            <span className={styles.sellerRating}>
              <StarIcon /> {sellerRating} ({sellerRatingCount.toLocaleString("en-IN")} ratings)
            </span>
          </div>

          <p className={styles.description}>
            A beautiful {product.name.toLowerCase()}, crafted in pure {product.fabric} with{" "}
            {product.design === "plain" ? "a clean, understated finish" : product.design} detailing — perfect for{" "}
            {product.occasion} and special occasions.
          </p>

          <div className={styles.colorSection}>
            <div className={styles.sectionLabel}>Color: {capitalize(selectedColor)}</div>
            <div className={styles.colorSwatches}>
              {COLORS.map((color) => (
                <button
                  key={color.key}
                  type="button"
                  aria-label={color.key}
                  className={`${styles.colorSwatch} ${selectedColor === color.key ? styles.colorSwatchActive : ""}`}
                  style={{ background: color.hex }}
                  onClick={() => setSelectedColor(color.key)}
                />
              ))}
            </div>
          </div>

          <div className={styles.qtySection}>
            <div className={styles.sectionLabel}>Quantity</div>
            <span className={styles.qtyControl}>
              <button
                type="button"
                className={styles.qtyButton}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                type="button"
                className={styles.qtyButton}
                onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                disabled={quantity >= stock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </span>
            {stock <= 5 && <span className={styles.stockWarning}>Only {stock} left in stock</span>}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.addToCartBtn}
              onClick={() => {
                dispatch(
                  addItem({
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    color: selectedColor,
                    quantity,
                  })
                );
                setFeedback("Added to cart.");
              }}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={styles.buyNowBtn}
              onClick={() => {
                setBuyNowItem({
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  color: selectedColor,
                  quantity,
                });
                router.push("/checkout");
              }}
            >
              Buy Now
            </button>
            <button
              type="button"
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistBtnActive : ""}`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() =>
                dispatch(
                  toggleItem({
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    color: selectedColor,
                  })
                )
              }
            >
              <HeartIcon size={18} filled={isWishlisted} />
            </button>
          </div>
          {feedback && <p className={styles.feedback}>{feedback}</p>}

          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}><LockIcon size={18} /> Secure Payments</div>
            <div className={styles.trustBadge}><RefreshIcon size={18} /> Easy Returns</div>
            <div className={styles.trustBadge}><ShieldIcon size={18} /> Authentic Products</div>
            <div className={styles.trustBadge}><GlobeIcon size={18} /> Worldwide Shipping</div>
          </div>
        </div>
      </div>

      <section className={styles.tabsSection}>
        <div className={styles.tabList}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label === "Reviews" ? `Reviews (${reviewCount})` : tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabPanel}>
          {activeTab === "description" && (
            <>
              <p>
                This {product.name.toLowerCase()} is handpicked for its craftsmanship and timeless appeal, blending
                traditional weaving techniques with a design that suits {product.occasion} celebrations and beyond.
              </p>
              <ul className={styles.specList}>
                <li><strong>Fabric:</strong> {capitalize(product.fabric)}</li>
                <li><strong>Work:</strong> {capitalize(product.design)}</li>
                <li><strong>Length:</strong> 5.5 meters (with blouse piece)</li>
                <li><strong>Occasion:</strong> {capitalize(product.occasion)}</li>
              </ul>
            </>
          )}

          {activeTab === "fabric-care" && (
            <ul className={styles.specList}>
              <li>Dry clean recommended for best results.</li>
              <li>Store folded in a muslin cloth, away from direct sunlight.</li>
              <li>Iron on low heat, preferably on the reverse side.</li>
              <li>Avoid contact with perfumes and sprays to protect the zari and dyes.</li>
            </ul>
          )}

          {activeTab === "shipping-returns" && (
            <ul className={styles.specList}>
              <li>Free shipping on orders above ₹999.</li>
              <li>Dispatched within 2-3 business days.</li>
              <li>Easy 7-day returns on unused items with original tags.</li>
              <li>Worldwide shipping available at checkout.</li>
            </ul>
          )}

          {activeTab === "reviews" && (
            <p>Customer reviews for this saree are coming soon.</p>
          )}
        </div>
      </section>

      {isZoomOpen && (
        <div
          className={styles.zoomOverlay}
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} zoomed image`}
        >
          <button
            type="button"
            className={styles.zoomCloseBtn}
            onClick={() => setIsZoomOpen(false)}
            aria-label="Close zoomed image"
          >
            <CloseIcon />
          </button>
          <div className={styles.zoomImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image src={product.image} alt={product.name} fill sizes="90vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;

function ZoomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  );
}

