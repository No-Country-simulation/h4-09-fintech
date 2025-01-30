import styles from "./Card.module.css";
import { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CardProps {
    icon?: ReactNode;
    title?: string; 
    description?: string; 
    link?:string;
  }

export default function Card({ icon, title, description, link}: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <i className="fas fa-info-circle"></i>{" "}
        {icon}
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>{title}</h2>
        <p className={styles.description}>
          {description}
        </p>
      </div>
      <div>
      {link ? (
          <Link to={link} className={styles.arrowLink}>
            <FaArrowRightLong className={styles.iconArrow}/>
          </Link>
        ) : (
          <FaArrowRightLong className={styles.iconArrow}/>
        )}
      </div>
    </div>
  );
}
