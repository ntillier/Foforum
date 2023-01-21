import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePrefs, toogleMenu, closeMenu, useSidebarTags, useSidebarCategories } from 'contexts/prefs';
import styles from 'styles/global/sidebar.module.css';

var general = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/inbox',
        label: 'Inbox'
    },
    {
        href: '/account',
        label: 'Account'
    }
];

export default function SideBar () {
    const router = useRouter();
    const prefs = usePrefs();
    const tags = useSidebarTags();
    const categories = useSidebarCategories();

    return (<>
        <div className={`${styles.sidebar} ${prefs.isMenuOpened ? styles.show : ''}`}>
            <div className={styles.general}>
                {
                    general.map((i) => 
                        <Link data-selected={ router.asPath === i.href } key={i.href} href={i.href}>{ i.label }</Link>
                    )
                }
            </div>

            <div className={styles.part}>
                <div className={styles.label}>CATEGORIES</div>
                {
                    categories.map((i) => {
                        let selected = router.asPath === `/c/${i.id}`;
                        return (
                            <Link key={i.id} data-selected={ selected } href={`/c/${i.id}`}>
                                <div className={styles.circle} style={{ borderColor: i.color, background: selected ? i.color: 'transparent' }}></div>
                                <span>{ i.label }</span>
                            </Link>
                        );
                    })
                }
                <Link data-selected={ router.asPath === '/categories' } href="/categories">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox='0 0 48 48'>
                        <path d="M17.35 16.15q-1 0-1.675-.675T15 13.75q0-1 .675-1.675t1.675-.675H40.9q1 0 1.675.675t.675 1.725q0 1-.675 1.675t-1.675.675Zm0 10.2q-1 0-1.675-.675T15 24q0-1 .675-1.675t1.675-.675H40.9q1 0 1.675.675T43.25 24q0 1-.675 1.675t-1.675.675Zm0 10.25q-1 0-1.675-.675T15 34.2q0-1 .675-1.675t1.675-.675H40.9q1 0 1.675.675t.675 1.725q0 1-.675 1.675T40.9 36.6ZM7.3 16.3q-1.05 0-1.8-.725t-.75-1.825q0-1.05.75-1.8t1.8-.75q1.1 0 1.825.75.725.75.725 1.8 0 1.1-.75 1.825-.75.725-1.8.725Zm0 10.25q-1.05 0-1.8-.75T4.75 24q0-1.05.75-1.8t1.8-.75q1.1 0 1.825.75.725.75.725 1.8t-.75 1.8q-.75.75-1.8.75Zm0 10.2q-1.05 0-1.8-.725T4.75 34.2q0-1.05.75-1.8t1.8-.75q1.1 0 1.825.75.725.75.725 1.8 0 1.1-.75 1.825-.75.725-1.8.725Z"/>
                    </svg>
                    <span>All categories</span>
                </Link>
            </div>

            <div className={styles.part}>
                <div className={styles.label}>TAGS</div>
                {
                    tags.map((i) => {
                        let selected = router.asPath === `/tag/${i.id}`;
                        return (
                            <Link key={i.id} data-selected={ selected } href={`/tag/${i.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox='0 0 48 48'>
                                    <path  d="M9 38q-1.25 0-2.125-.875T6 35V13q0-1.25.875-2.125T9 10h21q1.1 0 2 .575.9.575 1.55 1.475l7.25 10.2q.55.75.55 1.725 0 .975-.55 1.775l-7.25 10.2q-.65.9-1.55 1.475-.9.575-2 .575Zm29.25-14-7.7-11H9v22h21.55ZM9 24v11-22Z"/>
                                </svg>
                                <span>{ i.label }</span>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
        <div className={styles.background} onClick={closeMenu}></div>
    
    </>);
}