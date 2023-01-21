import Link from "next/link";

export default function NotFound ({ message = 'Oops. It looks like this topic doesn&#39;t exists.' }) {
    return (
        <>
            <div style={{ display: 'block', textAlign: 'center', padding: '48px', fontSize: '18px', fontWeight: 600 }}>
                { message } <Link href="/categories">Browse all topics</Link>
            </div>
            
        </>
    );
}
// <Link href="/categories" style={{ width: 'max-content', textDecoration: 'none', display: 'flex', margin: '12px auto', borderRadius: '4px', outline: 'none', border: 'solid 1px var(--color-highest)', color: 'var(--color-highest)', cursor: 'pointer', background: 'var(--primary-transparent)', padding: '12px 18px' }}>Browse the topics</Link>