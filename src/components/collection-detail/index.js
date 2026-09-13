"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleItem } from "@/store/slice/WishlistSlice";
import styles from "./index.module.css";

const PRICE_RANGES = [
  { key: "under-2000", label: "Under ₹2,000", test: (p) => p < 2000 },
  { key: "2000-5000", label: "₹2,000 - ₹5,000", test: (p) => p >= 2000 && p <= 5000 },
  { key: "5000-10000", label: "₹5,000 - ₹10,000", test: (p) => p > 5000 && p <= 10000 },
  { key: "above-10000", label: "Above ₹10,000", test: (p) => p > 10000 },
];

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

const DEFAULT_SECONDARY_FACET = {
  field: "design",
  label: "Design",
  options: [
    { key: "zari", label: "Zari Work" },
    { key: "embroidery", label: "Embroidery" },
    { key: "plain", label: "Plain" },
    { key: "printed", label: "Printed" },
  ],
};

const OCCASIONS = [
  { key: "wedding", label: "Wedding" },
  { key: "reception", label: "Reception" },
  { key: "engagement", label: "Engagement" },
];

const PAGE_SIZE = 12;

function toggle(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const CollectionDetail = ({
  title,
  subtitle,
  bannerImage,
  products,
  secondaryFacet = DEFAULT_SECONDARY_FACET,
  breadcrumbParent = { label: "Collections", href: "/collections" },
}) => {
  const [priceFilters, setPriceFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);
  const [secondaryFilters, setSecondaryFilters] = useState([]);
  const [occasionFilters, setOccasionFilters] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const wishlistSlugs = useAppSelector((state) => new Set(state.wishlist.items.map((item) => item.slug)));

  const hasActiveFilters =
    priceFilters.length > 0 || colorFilters.length > 0 || secondaryFilters.length > 0 || occasionFilters.length > 0;

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const priceOk =
        priceFilters.length === 0 ||
        PRICE_RANGES.some((range) => priceFilters.includes(range.key) && range.test(product.price));
      const colorOk = colorFilters.length === 0 || colorFilters.includes(product.color);
      const secondaryOk =
        secondaryFilters.length === 0 || secondaryFilters.includes(product[secondaryFacet.field]);
      const occasionOk = occasionFilters.length === 0 || occasionFilters.includes(product.occasion);
      return priceOk && colorOk && secondaryOk && occasionOk;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, priceFilters, colorFilters, secondaryFilters, occasionFilters, sortBy, secondaryFacet.field]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateFilter = (setter) => (value) => {
    setter((current) => toggle(current, value));
    setPage(1);
  };

  const clearAll = () => {
    setPriceFilters([]);
    setColorFilters([]);
    setSecondaryFilters([]);
    setOccasionFilters([]);
    setPage(1);
  };

  return (
    <main>
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>{" "}
        {breadcrumbParent && (
          <>
            {">"} <Link href={breadcrumbParent.href}>{breadcrumbParent.label}</Link>{" "}
          </>
        )}
        {">"} {title}
      </nav>

      <section className={styles.banner}>
        <Image src={bannerImage} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className={styles.bannerScrim} />
        <div className={styles.bannerContent}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Filters</h2>
            {hasActiveFilters && (
              <button type="button" className={styles.clearAll} onClick={clearAll}>
                Clear All
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            <h3>Price</h3>
            {PRICE_RANGES.map((range) => (
              <label key={range.key} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={priceFilters.includes(range.key)}
                  onChange={() => updateFilter(setPriceFilters)(range.key)}
                />
                {range.label}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3>Color</h3>
            <div className={styles.colorSwatches}>
              {COLORS.map((color) => (
                <button
                  key={color.key}
                  type="button"
                  aria-label={color.key}
                  className={`${styles.colorSwatch} ${colorFilters.includes(color.key) ? styles.colorSwatchActive : ""}`}
                  style={{ background: color.hex }}
                  onClick={() => updateFilter(setColorFilters)(color.key)}
                />
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>{secondaryFacet.label}</h3>
            {secondaryFacet.options.map((option) => (
              <label key={option.key} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={secondaryFilters.includes(option.key)}
                  onChange={() => updateFilter(setSecondaryFilters)(option.key)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3>Occasion</h3>
            {OCCASIONS.map((occasion) => (
              <label key={occasion.key} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={occasionFilters.includes(occasion.key)}
                  onChange={() => updateFilter(setOccasionFilters)(occasion.key)}
                />
                {occasion.label}
              </label>
            ))}
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <span>{filtered.length} Products</span>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {pageItems.length === 0 ? (
            <p className={styles.emptyState}>No products match the selected filters.</p>
          ) : (
            <div className={styles.grid}>
              {pageItems.map((product) => {
                const isWishlisted = wishlistSlugs.has(product.slug);
                return (
                <div className={styles.card} key={product.slug || product.name}>
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
                          color: product.color,
                        })
                      )
                    }
                  >
                    <HeartIcon filled={isWishlisted} />
                  </button>
                  <Link href={`/sarees/${product.slug}`} className={styles.cardLink}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.cardInfo}>
                      <h3>{product.name}</h3>
                      <div className={styles.cardPrice}>₹{product.price.toLocaleString("en-IN")}</div>
                    </div>
                  </Link>
                </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageArrow}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`${styles.pageNumber} ${num === currentPage ? styles.pageNumberActive : ""}`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className={styles.pageArrow}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CollectionDetail;

function HeartIcon({ filled = false }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}
