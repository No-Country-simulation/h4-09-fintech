import styles from "./Card.module.css";
import { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";


interface CardProps {
    icon?: ReactNode;
    title?: string; 
    description?: string; 
    arrow?: ReactNode; 
  }


export default function Card({ icon, title, description}: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <i className="fas fa-info-circle"></i>{" "}
        {icon}
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description}
        </p>
      </div>
      <div>
      <FaArrowRightLong />
      </div>
    </div>
  );
}
