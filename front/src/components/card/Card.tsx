import styles from "./Card.module.css";
import { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CardProps {
    icon?: ReactNode;
    title?: string; 
    description?: string; 
    link?:string;
    onClick?: () => void
  }

  export default function Card({ icon, title, description, link, onClick }: CardProps) {
    const CardContent = (
      <div className={styles.card} onClick={onClick}>
        <div className={styles.icon}>
          <i className="fas fa-info-circle"></i>{" "}
          {icon}
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitle}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <div>
          <FaArrowRightLong className={styles.iconArrow} />
        </div>
      </div>
    );
  
    return link ? (
      <Link to={link} className={styles.cardLink}>
        {CardContent}
      </Link>
    ) : (
      CardContent
    );
  }
