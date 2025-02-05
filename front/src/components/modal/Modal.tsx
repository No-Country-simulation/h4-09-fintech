import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function Modal({ isOpen, title, message, onClose }: ModalProps) {
  if (!isOpen) return null; // No renderizar si no está abierto

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-header"]}>{title}</div>
        <div className={styles["modal-body"]}>{message}</div>
        <div className={styles["modal-footer"]}>
          <button className={styles["close-button"]} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
