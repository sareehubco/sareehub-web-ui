"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import HeartIcon from "@/icons/heart-icon";
import BagIcon from "@/icons/bag-icon";
import PersonIcon from "@/icons/person-icon";
import styles from "./index.module.css";

const ANNOUNCEMENTS = [
  "Free shipping on orders above ₹999 | Easy Returns | Authentic Handlooms",
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Sarees", href: "/sarees" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
];

function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  const go = (delta) => {
    setIndex((current) => (current + delta + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  return (
    <div className={styles.announcementBar}>
      <button
        type="button"
        className={`${styles.announcementArrow} ${styles.announcementArrowLeft}`}
        onClick={() => go(-1)}
        aria-label="Previous announcement"
      >
        <ChevronIcon direction="left" />
      </button>
      <span className={styles.announcementText}>{ANNOUNCEMENTS[index]}</span>
      <button
        type="button"
        className={`${styles.announcementArrow} ${styles.announcementArrowRight}`}
        onClick={() => go(1)}
        aria-label="Next announcement"
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}

const MainHeader = () => {
  const pathname = usePathname();
  const cartCount = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  const linkClass = (href) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return isActive ? styles.active : undefined;
  };

  return (
    <>
      <AnnouncementBar />

      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="SareeHub — Draped in Traditions"
            width={1728}
            height={458}
            className={styles.logoImage}
            priority
            unoptimized
          />
        </Link>

        <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.searchBox}>
            <input type="search" placeholder="Search for sarees, collections, or more..." />
            <button type="submit" className={styles.searchSubmit} aria-label="Search">
              <SearchIcon />
            </button>
          </div>
        </form>

        <div className={styles.headerRight}>
          <Link href="/wishlist" className={styles.iconLink}>
            <HeartIcon />
            Wishlist
            {wishlistCount > 0 && <span className={styles.cartBadge}>{wishlistCount}</span>}
          </Link>
          <Link href="/cart" className={styles.iconLink}>
            <BagIcon />
            Cart
            <span className={styles.cartBadge}>{cartCount}</span>
          </Link>
          <AccountMenu />
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass(link.href)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MainHeader;

function AccountMenu() {
  const { authenticated, firstName, email } = useAppSelector((state) => state.user);

  if (!authenticated) {
    return (
      <Link href="/login" className={styles.iconLink}>
        <PersonIcon />
        Login
      </Link>
    );
  }

  const initial = (firstName || email || "?").charAt(0).toUpperCase();

  return (
    <Link href="/account" className={styles.avatarBtn} aria-label="My Account">
      {initial}
    </Link>
  );
}

function ChevronIcon({ direction }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

