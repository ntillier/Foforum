/* eslint-disable @next/next/no-img-element */
import { toogleMenu } from 'contexts/prefs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styles from 'styles/global/header.module.css';

export default function Header () {
    const router = useRouter();

    const search = useCallback((e) => {
        if (e.key === 'Enter') {
            router.push(`/search?q=${encodeURIComponent(e.target.value)}`);
            e.target.value = '';
        }
    });

    return (
        <div className={styles.header}>
            <div className={styles.leftPart}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox='0 0 48 48' className={styles.menu} onClick={toogleMenu} >
                    <path d="M7.5 37.4q-1 0-1.675-.675T5.15 35.05q0-1 .675-1.675T7.5 32.7h33q1 0 1.675.675t.675 1.675q0 1-.675 1.675T40.5 37.4Zm0-11.05q-1 0-1.675-.675T5.15 24q0-1 .675-1.675T7.5 21.65h33q1 0 1.675.675T42.85 24q0 1-.675 1.675t-1.675.675Zm0-11.05q-1 0-1.675-.675T5.15 12.95q0-1 .675-1.7t1.675-.7h33q1 0 1.675.7t.675 1.7q0 1-.675 1.675T40.5 15.3Z"/>
                </svg>
                <img
                    src="/next.svg"
                    alt="Foforum"
                    className={styles.logo}
                    onClick={() => router.push('/')}
                />
            </div>
            <div className={styles.rightPart}>
                <div className={styles.input}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox='0 0 48 48'>
                        <path fill="var(--color-dimmer)" d="M38.7 40.85 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L40.95 38.7q.45.4.45 1.025 0 .625-.5 1.125-.45.45-1.1.45-.65 0-1.1-.45Zm-19.85-12.3q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"/>
                    </svg>
                    <input placeholder='Search' onKeyDown={search} />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox='0 0 48 48' className={styles.notifications}>
                    <path d="M9.5 38q-.65 0-1.075-.425Q8 37.15 8 36.5q0-.65.425-1.075Q8.85 35 9.5 35h2.7V19.7q0-4.1 2.475-7.425T21.2 8.1V6.65q0-1.15.825-1.9T24 4q1.15 0 1.975.75.825.75.825 1.9V8.1q4.05.85 6.55 4.175 2.5 3.325 2.5 7.425V35h2.65q.65 0 1.075.425Q40 35.85 40 36.5q0 .65-.425 1.075Q39.15 38 38.5 38ZM24 23.25ZM24 44q-1.6 0-2.8-1.175Q20 41.65 20 40h8q0 1.65-1.175 2.825Q25.65 44 24 44Zm-8.8-9h17.65V19.7q0-3.75-2.525-6.325T24.1 10.8q-3.75 0-6.325 2.575T15.2 19.7Z"/>
                </svg>
                <div className={styles.profile}>
                    <img
                        src="/profile.png"
                        alt='-'
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox='0 0 48 48'>
                        <path d="M22.95 28.95 16.6 22.6q-.7-.7-.325-1.625.375-.925 1.375-.925h12.7q1 0 1.375.925T31.4 22.6l-6.35 6.35q-.25.25-.5.35-.25.1-.55.1-.3 0-.55-.1-.25-.1-.5-.35Z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}