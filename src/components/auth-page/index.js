"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userLogin } from "@/actions/UserActions";
import customerService from "@/api/CustomerService";
import styles from "./index.module.css";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector((state) => state.user);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const updateField = (field) => (e) => {
    setForm((current) => ({ ...current, [field]: e.target.value }));
  };

  const passwordsMatch = form.password === form.confirmPassword;

  const isFormValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phoneNumber.trim() &&
    form.password.length >= 6 &&
    passwordsMatch;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid || submitting) return;

    setSubmitting(true);
    setError("");
    try {
      await customerService.registerCustomer({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
      });
      setRegistered(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authenticated) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <h1>You&apos;re already logged in</h1>
          <p>Head over to your account to manage orders and details.</p>
          <Link href="/account" className={styles.primaryBtn}>
            Go to My Account
          </Link>
        </div>
      </main>
    );
  }

  if (registered) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <span className={styles.successIcon}>
            <CheckIcon />
          </span>
          <h1>Account created!</h1>
          <p>Your SareeHub account is ready. Log in to continue.</p>
          <button type="button" className={styles.primaryBtn} onClick={() => dispatch(userLogin())}>
            Continue to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === "signup" ? styles.tabActive : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <div className={styles.loginPanel}>
            <h1>Welcome back</h1>
            <p>Log in securely through your SareeHub account.</p>
            <button type="button" className={styles.primaryBtn} onClick={() => dispatch(userLogin())}>
              Continue to Login
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleRegister}>
            <h1>Create your account</h1>

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                First Name
                <input value={form.firstName} onChange={updateField("firstName")} required />
              </label>
              <label className={styles.field}>
                Last Name
                <input value={form.lastName} onChange={updateField("lastName")} required />
              </label>
            </div>

            <label className={styles.field}>
              Email
              <input type="email" value={form.email} onChange={updateField("email")} required />
            </label>

            <label className={styles.field}>
              Phone Number
              <input type="tel" value={form.phoneNumber} onChange={updateField("phoneNumber")} required />
            </label>

            <label className={styles.field}>
              Password
              <input
                type="password"
                value={form.password}
                onChange={updateField("password")}
                minLength={6}
                required
              />
            </label>

            <label className={styles.field}>
              Confirm Password
              <input
                type="password"
                value={form.confirmPassword}
                onChange={updateField("confirmPassword")}
                minLength={6}
                required
              />
            </label>

            {form.confirmPassword && !passwordsMatch && <p className={styles.fieldError}>Passwords do not match.</p>}
            {error && <p className={styles.fieldError}>{error}</p>}

            <button type="submit" className={styles.primaryBtn} disabled={!isFormValid || submitting}>
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default AuthPage;

function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
