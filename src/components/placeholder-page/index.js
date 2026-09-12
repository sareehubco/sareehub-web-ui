import styles from "./index.module.css";

const PlaceholderPage = ({ title, description }) => {
  return (
    <main className={styles.page}>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
};

export default PlaceholderPage;
