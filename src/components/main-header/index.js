"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userLogin, userLogout } from "@/actions/UserActions";
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
          </Link>
          <Link href="/cart" className={styles.iconLink}>
            <BagIcon />
            Cart
            <span className={styles.cartBadge}>0</span>
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
  const dispatch = useAppDispatch();
  const { authenticated, firstName, lastName, email } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!authenticated) {
    return (
      <button
        type="button"
        className={styles.iconLink}
        onClick={() => dispatch(userLogin())}
      >
        <PersonIcon />
        Login
      </button>
    );
  }

  const initial = (firstName || email || "?").charAt(0).toUpperCase();

  return (
    <div className={styles.accountMenu} ref={menuRef}>
      <button
        type="button"
        className={styles.avatarBtn}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div className={styles.accountDropdown}>
          <div className={styles.accountName}>
            {firstName} {lastName}
          </div>
          {email && <div className={styles.accountEmail}>{email}</div>}

          <Link href="/wishlist" className={styles.accountItem} onClick={() => setOpen(false)}>
            Wishlist
          </Link>
          <Link href="/cart" className={styles.accountItem} onClick={() => setOpen(false)}>
            Orders
          </Link>

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => {
              dispatch(userLogout());
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
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

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
