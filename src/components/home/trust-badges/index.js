import styles from "./index.module.css";

const BADGES = [
  { title: "Authentic Products", subtitle: "100% Genuine", icon: ShieldIcon },
  { title: "Secure Payments", subtitle: "Safe & Encrypted", icon: CardIcon },
  { title: "Easy Returns", subtitle: "Hassle Free", icon: RefreshIcon },
  { title: "Worldwide Shipping", subtitle: "Sarees Across Borders", icon: GlobeIcon },
  { title: "Customer Support", subtitle: "We're Here to Help", icon: HeadsetIcon },
];

const TrustBadges = () => {
  return (
    <section className={styles.badges}>
      {BADGES.map(({ title, subtitle, icon: Icon }) => (
        <div className={styles.badge} key={title}>
          <span className={styles.iconCircle}>
            <Icon />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrustBadges;

function iconProps() {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

function ShieldIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1" />
      <rect x="17" y="13" width="4" height="6" rx="1" />
      <path d="M19 19a4 4 0 0 1-4 3h-2" />
    </svg>
  );
}
