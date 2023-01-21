import styles from 'styles/ui/select.module.css';
import { useState, useCallback } from 'react';

export default function Select({ items = [], initial = 0, onChange = () => { } }) {
    const [selected, setSelected] = useState(initial);

    const select = useCallback((index) => {
        document?.activeElement?.blur();

        if (index === selected[0]) return;

        setSelected(index);
        onChange(index);
    });

    return (
        <div className={styles.select}>
            <button>
                <span>{items[selected]?.label || 'Select'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' className={styles.chevron}>
                    <path d="M22.95 28.95 16.6 22.6q-.7-.7-.325-1.625.375-.925 1.375-.925h12.7q1 0 1.375.925T31.4 22.6l-6.35 6.35q-.25.25-.5.35-.25.1-.55.1-.3 0-.55-.1-.25-.1-.5-.35Z" />
                </svg>
            </button>
            <div className={styles.popup}>
                {
                    items.map((i, j) =>
                        <div style={{ background: j === selected ? 'var(--primary-transparent)' : 'transparent' }} tabIndex={-1} key={j} onClick={ select.bind(null, j) }>{i.label}</div>
                    )
                }
            </div>
        </div>
    );
}