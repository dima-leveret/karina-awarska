import styles from "../styles/components/PrimaryButton.module.css";

export const PrimaryButtnom = ({ children, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};
