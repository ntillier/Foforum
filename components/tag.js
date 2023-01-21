import styles from 'styles/ui/tag.module.css';
import Link from 'next/link';

export default function Tag({ label, link }) {
    return (
        <Link href={`/tag/${link}`} className={styles.tag}>{ label }</Link>
    );
}