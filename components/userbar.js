import Link from "next/link";
import Role from "./roles";
import styles from 'styles/ui/userbar.module.css';

export default function UserBar({ user = {}, children, subtitle = '', bestAnswer = false }) {
    return (
        <div className={styles.bar}>
            <div className={`${styles.image} ${ bestAnswer ? styles.best : '' }`}>
                <img alt='' src={user?.image} />
                {
                    bestAnswer &&
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 48 48">
                        <path fill="var(--background-higher)" d="M18.9 35.1q-.3 0-.55-.1-.25-.1-.5-.35L8.8 25.6q-.45-.45-.45-1.1 0-.65.45-1.1.45-.45 1.05-.45.6 0 1.05.45l8 8 18.15-18.15q.45-.45 1.075-.45t1.075.45q.45.45.45 1.075T39.2 15.4L19.95 34.65q-.25.25-.5.35-.25.1-.55.1Z"/>
                    </svg>
                }
            </div>
            <div className={styles.user}>
                <div>
                    <Link href={`/@${user?.username}`}>{user?.name}</Link>
                    {
                        user.level &&
                            <Role label={user.level.label} color='var(--primary-transparent)' />
                    }
                </div>
                <div>{ subtitle }</div>
            </div>
            { children }
        </div>
    );
}