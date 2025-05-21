import React from "react";
import styles from "./LoadingSpinner.module.css";
import logo from "@/image/logo-no-text.svg";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.logoWrapper}>
        <img src={logo.src} className={styles.logo} alt="United Way Logo" />
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
