"use client";

import Link from "next/link";
import styles from "./index.module.css";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Orders & Shipping", href: "/help" },
      { label: "Returns & Refunds", href: "/help" },
      { label: "Payments", href: "/help" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Reviews", href: "/about" },
    ],
  },
];

const SiteFooter = () => {
  return (
    <footer>
      <div className={styles.newsletter}>
        <span>Join Our Journey</span>
        <form
          className={styles.newsletterForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <span style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--maroon)" }}>
              SareeHub
            </span>
            <p>
              Handpicked, handwoven sarees from across India — crafted with
              tradition, delivered with care.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div className={styles.footerCol} key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.footerCol}>
            <h3>Follow Us</h3>
            <div className={styles.socialRow}>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">i</a>
              <a href="#" aria-label="Pinterest">p</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© {new Date().getFullYear()} SareeHub. All rights reserved.</span>
          <div className={styles.paymentIcons}>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
