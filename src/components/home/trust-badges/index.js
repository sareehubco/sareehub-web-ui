import ShieldIcon from "@/icons/shield-icon";
import RefreshIcon from "@/icons/refresh-icon";
import GlobeIcon from "@/icons/globe-icon";
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
            <Icon size={20} />
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

function CardIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
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
