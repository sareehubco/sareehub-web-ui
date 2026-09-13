"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userLogout } from "@/actions/UserActions";
import styles from "./index.module.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "My Orders" },
  { key: "addresses", label: "Addresses" },
  { key: "wishlist", label: "Wishlist" },
  { key: "profile", label: "Profile" },
  { key: "wallet", label: "Wallet" },
  { key: "reviews", label: "Your Reviews" },
];

const ORDER_TABS = ["All Orders", "Processing", "Shipped", "Delivered"];

const ORDERS = [
  {
    id: "SH12345",
    date: "12 Aug 2025",
    status: "Delivered",
    total: 14997,
    images: ["/images/collections/bridal.png", "/images/collections/festive.png", "/images/collections/handloom.png"],
  },
  {
    id: "SH12344",
    date: "25 Jul 2025",
    status: "Shipped",
    total: 9998,
    images: ["/images/collections/party.png", "/images/collections/dailywear.png"],
  },
  {
    id: "SH12343",
    date: "10 Jul 2025",
    status: "Delivered",
    total: 6999,
    images: ["/images/collections/workwear.png"],
  },
];

const STATUS_STYLE = {
  Delivered: "statusDelivered",
  Shipped: "statusShipped",
  Processing: "statusProcessing",
};

const AccountDashboard = () => {
  const dispatch = useAppDispatch();
  const { authenticated, firstName, lastName, email, phone } = useAppSelector((state) => state.user);
  const [section, setSection] = useState("orders");
  const [orderTab, setOrderTab] = useState("All Orders");

  if (!authenticated) {
    return (
      <div className={styles.guard}>
        <h1>My Account</h1>
        <p>Please log in to view your account.</p>
        <Link href="/login">Login</Link>
      </div>
    );
  }

  const filteredOrders =
    orderTab === "All Orders" ? ORDERS : ORDERS.filter((order) => order.status === orderTab);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.navItem} ${section === item.key ? styles.navItemActive : ""}`}
            onClick={() => setSection(item.key)}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.navItem} ${styles.navItemLogout}`}
          onClick={() => dispatch(userLogout())}
        >
          Logout
        </button>
      </aside>

      <div className={styles.main}>
        {section === "dashboard" && (
          <>
            <h1>Welcome back, {firstName}!</h1>
            <p className={styles.emptyState}>
              You have {ORDERS.length} orders on your account. Use the menu on the left to manage your orders,
              addresses, and profile.
            </p>
          </>
        )}

        {section === "orders" && (
          <>
            <h1>My Orders</h1>
            <div className={styles.tabs}>
              {ORDER_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tabButton} ${orderTab === tab ? styles.tabButtonActive : ""}`}
                  onClick={() => setOrderTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <p className={styles.emptyState}>No orders in this category yet.</p>
            ) : (
              <div className={styles.orderList}>
                {filteredOrders.map((order) => (
                  <div className={styles.orderCard} key={order.id}>
                    <div className={styles.orderHeader}>
                      <div>
                        <h3>Order #{order.id}</h3>
                        <div className={styles.orderDate}>Placed on {order.date}</div>
                      </div>
                      <span className={`${styles.statusBadge} ${styles[STATUS_STYLE[order.status]]}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className={styles.orderBody}>
                      <div className={styles.orderLeft}>
                        <div className={styles.orderThumbs}>
                          {order.images.map((image) => (
                            <div className={styles.orderThumb} key={image}>
                              <Image src={image} alt="" fill sizes="60px" style={{ objectFit: "cover" }} />
                            </div>
                          ))}
                        </div>
                        <div className={styles.orderMeta}>
                          {order.images.length} item{order.images.length > 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className={styles.orderRight}>
                        <div className={styles.orderTotal}>₹{order.total.toLocaleString("en-IN")}</div>
                        <button type="button" className={styles.viewDetailsBtn}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {section === "addresses" && (
          <>
            <h1>Addresses</h1>
            <p className={styles.emptyState}>You haven&apos;t saved any addresses yet.</p>
          </>
        )}

        {section === "wishlist" && (
          <>
            <h1>Wishlist</h1>
            <p className={styles.emptyState}>
              View and manage your saved sarees on the <Link href="/wishlist">Wishlist page</Link>.
            </p>
          </>
        )}

        {section === "profile" && (
          <>
            <h1>Profile</h1>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span>Name</span>
                <span>{firstName} {lastName}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Email</span>
                <span>{email}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Phone</span>
                <span>{phone || "Not provided"}</span>
              </div>
            </div>
          </>
        )}

        {section === "wallet" && (
          <>
            <h1>Wallet</h1>
            <p className={styles.emptyState}>Wallet balance: ₹0</p>
          </>
        )}

        {section === "reviews" && (
          <>
            <h1>Your Reviews</h1>
            <p className={styles.emptyState}>You haven&apos;t written any reviews yet.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDashboard;
