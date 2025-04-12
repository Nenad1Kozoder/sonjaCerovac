import styles from "./Loader.module.scss";

const Loader = ({ colorClass }) => {
  const extColorClass = "spin_" + colorClass;

  return (
    <div className={`${styles.loaderWrapper} ${styles[extColorClass]}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
