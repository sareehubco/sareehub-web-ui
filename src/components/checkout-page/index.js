"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slice/CartSlice";
import { useBuyNowItem, clearBuyNowItem } from "@/store/buyNowItem";
import { setPostLoginRedirect } from "@/actions/UserActions";
import CheckIcon from "@/icons/check-icon";
import { formatPrice } from "@/lib/format";
import { calculateOrderTotals } from "@/lib/pricing";
import styles from "./index.module.css";

const DEFAULT_SHIPPING = {
  fullName: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pin: "",
  saveAddress: true,
};

const DRAFT_KEY = "sareehub_checkout_shipping_draft";

function saveShippingDraft(shipping) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(shipping));
  } catch {
    // sessionStorage unavailable — the shipping form just won't survive the login redirect.
  }
}

function clearShippingDraft() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

// Same no-same-tab-event reasoning as useBuyNowItem in src/store/buyNowItem.js.
function subscribeDraftNoop() {
  return () => {};
}

let cachedDraftRaw;
let cachedDraftSnapshot = null;

function readDraftSnapshot() {
  if (typeof window === "undefined") return null;
  let raw;
  try {
    raw = window.sessionStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
  if (raw !== cachedDraftRaw) {
    cachedDraftRaw = raw;
    try {
      cachedDraftSnapshot = raw ? JSON.parse(raw) : null;
    } catch {
      cachedDraftSnapshot = null;
    }
  }
  return cachedDraftSnapshot;
}

function getDraftServerSnapshot() {
  return null;
}

// Reads the saved shipping draft without a hydration mismatch — see the
// matching useBuyNowItem hook for why useSyncExternalStore instead of a
// useEffect + setState.
function useShippingDraftSnapshot() {
  return useSyncExternalStore(subscribeDraftNoop, readDraftSnapshot, getDraftServerSnapshot);
}

const STEPS = [
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const PAYMENT_METHODS = [
  { key: "card", label: "Credit / Debit Card" },
  { key: "upi", label: "UPI" },
  { key: "cod", label: "Cash on Delivery" },
];

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const authenticated = useAppSelector((state) => state.user.authenticated);
  // "Buy Now" on a product page checks out just that saree, bypassing the
  // shared cart entirely — when present, it takes over the whole checkout.
  // Read via useSyncExternalStore (not useEffect + setState) so the server
  // render and the client's first render match — see src/store/buyNowItem.js.
  const buyNowItem = useBuyNowItem();
  const items = buyNowItem ? [buyNowItem] : cartItems;
  const [stepIndex, setStepIndex] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [placedTotal, setPlacedTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shipping, setShipping] = useState(DEFAULT_SHIPPING);
  const [hasAppliedDraft, setHasAppliedDraft] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [prevAuthenticated, setPrevAuthenticated] = useState(authenticated);

  const shippingDraft = useShippingDraftSnapshot();

  // Apply a restored draft into the editable shipping state exactly once.
  // (Adjusting state during render, not in an effect, per
  // https://react.dev/learn/you-might-not-need-an-effect — same reasoning as
  // the authenticated check right below.)
  if (shippingDraft && !hasAppliedDraft) {
    setHasAppliedDraft(true);
    setShipping(shippingDraft);
    setHasRestoredDraft(true);
  }

  // Coming back from the Keycloak login redirect: the shipping details typed in
  // before login are already restored above — just resume at the Payment step
  // once the auth state flips to true.
  if (authenticated !== prevAuthenticated) {
    setPrevAuthenticated(authenticated);
    if (authenticated && hasRestoredDraft) {
      setStepIndex(1);
      setHasRestoredDraft(false);
      clearShippingDraft();
    }
  }

  const { itemCount, subtotal, tax, total } = calculateOrderTotals(items);

  const updateField = (field) => (e) => {
    const value = field === "saveAddress" ? e.target.checked : e.target.value;
    setShipping((current) => ({ ...current, [field]: value }));
  };

  const isShippingValid =
    shipping.fullName.trim() &&
    shipping.phone.trim() &&
    shipping.address.trim() &&
    shipping.city.trim() &&
    shipping.state.trim() &&
    shipping.pin.trim();

  if (items.length === 0 && !placed) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <p>Your cart is empty. Add some sarees before checking out.</p>
          <Link href="/sarees">Shop All Sarees</Link>
        </div>
      </main>
    );
  }

  if (placed) {
    return (
      <main className={styles.page}>
        <div className={styles.placedState}>
          <span className={styles.placedIcon}>
            <CheckIcon size={28} />
          </span>
          <h1>Order Placed!</h1>
          <p>Thank you{shipping.fullName ? `, ${shipping.fullName.split(" ")[0]}` : ""} — your order has been placed successfully.</p>
          <p className={styles.placedTotal}>Total paid: {formatPrice(placedTotal)}</p>
          <Link href="/sarees" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Checkout</h1>

      <div className={styles.stepper}>
        {STEPS.map((step, i) => (
          <div className={styles.stepItemWrap} key={step.key}>
            <div className={styles.stepItem}>
              <span className={`${styles.stepCircle} ${i <= stepIndex ? styles.stepCircleActive : ""}`}>
                {i < stepIndex ? <CheckIcon size={12} /> : i + 1}
              </span>
              <span className={i <= stepIndex ? styles.stepLabelActive : styles.stepLabel}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && <span className={styles.stepConnector} />}
          </div>
        ))}
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          {stepIndex === 0 && (
            <section>
              <h2>Shipping Address</h2>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isShippingValid) return;
                  if (!authenticated) {
                    saveShippingDraft(shipping);
                    setPostLoginRedirect("/checkout");
                    router.push("/login");
                    return;
                  }
                  setStepIndex(1);
                }}
              >
                <label className={styles.field}>
                  Full Name
                  <input value={shipping.fullName} onChange={updateField("fullName")} required />
                </label>

                <label className={styles.field}>
                  Phone Number
                  <input type="tel" value={shipping.phone} onChange={updateField("phone")} required />
                </label>

                <label className={styles.field}>
                  Address
                  <input value={shipping.address} onChange={updateField("address")} required />
                </label>

                <label className={styles.field}>
                  Apartment, Suite, etc. (Optional)
                  <input value={shipping.apartment} onChange={updateField("apartment")} />
                </label>

                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    City
                    <input value={shipping.city} onChange={updateField("city")} required />
                  </label>
                  <label className={styles.field}>
                    State
                    <select value={shipping.state} onChange={updateField("state")} required>
                      <option value="" disabled>
                        Select state
                      </option>
                      {STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className={styles.field}>
                  PIN Code
                  <input value={shipping.pin} onChange={updateField("pin")} maxLength={6} required />
                </label>

                <label className={styles.checkboxField}>
                  <input type="checkbox" checked={shipping.saveAddress} onChange={updateField("saveAddress")} />
                  Save this address for future orders
                </label>

                <button type="submit" className={styles.continueBtn} disabled={!isShippingValid}>
                  Continue to Payment
                </button>
              </form>
            </section>
          )}

          {stepIndex === 1 && (
            <section>
              <h2>Payment Method</h2>
              <div className={styles.paymentOptions}>
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.key}
                    className={`${styles.paymentOption} ${paymentMethod === method.key ? styles.paymentOptionActive : ""}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method.key}
                      onChange={() => setPaymentMethod(method.key)}
                    />
                    {method.label}
                  </label>
                ))}
              </div>
              <p className={styles.note}>This is a demo checkout — no real payment will be taken.</p>

              <div className={styles.stepActions}>
                <button type="button" className={styles.backBtn} onClick={() => setStepIndex(0)}>
                  Back
                </button>
                <button type="button" className={styles.continueBtn} onClick={() => setStepIndex(2)}>
                  Continue to Review
                </button>
              </div>
            </section>
          )}

          {stepIndex === 2 && (
            <section>
              <h2>Review Your Order</h2>

              <div className={styles.reviewBlock}>
                <h3>Shipping to</h3>
                <p>
                  {shipping.fullName}
                  <br />
                  {shipping.address}
                  {shipping.apartment ? `, ${shipping.apartment}` : ""}
                  <br />
                  {shipping.city}, {shipping.state} {shipping.pin}
                  <br />
                  {shipping.phone}
                </p>
              </div>

              <div className={styles.reviewBlock}>
                <h3>Payment Method</h3>
                <p>{PAYMENT_METHODS.find((method) => method.key === paymentMethod)?.label}</p>
              </div>

              <div className={styles.stepActions}>
                <button type="button" className={styles.backBtn} onClick={() => setStepIndex(1)}>
                  Back
                </button>
                <button
                  type="button"
                  className={styles.continueBtn}
                  onClick={() => {
                    setPlacedTotal(total);
                    if (buyNowItem) {
                      clearBuyNowItem();
                    } else {
                      dispatch(clearCart());
                    }
                    setPlaced(true);
                  }}
                >
                  Place Order
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>{itemCount} items</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Estimated Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className={styles.summaryItems}>
            {items.map((item) => (
              <div className={styles.summaryItem} key={item.slug}>
                <div className={styles.summaryItemImage}>
                  <Image src={item.image} alt={item.name} fill sizes="56px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div className={styles.summaryItemName}>{item.name}</div>
                  <div className={styles.summaryItemPrice}>{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
