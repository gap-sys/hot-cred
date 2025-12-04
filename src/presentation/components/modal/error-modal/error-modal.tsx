import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaExclamationTriangle } from 'react-icons/fa';

import styles from './error-modal.module.scss';

interface ErrorModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    errors: string[];
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
    isOpen,
    onRequestClose,
    errors
}) => (
    <Modal
        open={isOpen}
        onClose={onRequestClose}
        center
        blockScroll={true}
        classNames={{ modal: styles.modal, overlay: styles.overlay }}
        closeIcon={null}
        aria-labelledby="error-modal-title"
    >
        <div className={styles.content}>
            <div className={styles.iconContainer}>
                <FaExclamationTriangle className={styles.icon} />
            </div>

            <h3 className={styles.title}>Ops! Encontramos alguns problemas</h3>

            <div className={styles.errorList}>
                {errors.map((error, index) => (
                    <div key={index} className={styles.errorItem}>
                        <span className={styles.errorBullet}>•</span>
                        <span className={styles.errorText}>{error}</span>
                    </div>
                ))}
            </div>

            <button
                className={styles.button}
                onClick={onRequestClose}
            >
                Entendi
            </button>
        </div>
    </Modal>
);
