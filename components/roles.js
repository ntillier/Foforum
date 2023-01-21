import styles from 'styles/ui/role.module.css';
import Link from 'next/link';

export default function Role ({ label, color, link }) {
    return (
        <div className={styles.role} style={{ background: color }}>{ label }</div>
    );
}