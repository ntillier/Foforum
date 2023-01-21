import { useCallback, useEffect, useRef, useState } from 'react';
import styles from 'styles/ui/selector.module.css';

export default function Selector ({ items = [], initial = 0 }) {
    const [options, setOptions] = useState(items);
    const [selected, setSelected] = useState([initial, items[initial]]);
    const input = useRef();

    useEffect(() => {
        setOptions(items);
        setSelected([ initial, items[initial] ]);
    }, [initial, items]);

    const select = useCallback((index) => {
        document?.activeElement?.blur();

        if (index === selected[0]) return;

        setSelected([index, options[index]]);
        setOptions(items);

        input.current.value = '';
        options[index]?.onSelect();
    });

    const search = useCallback((e) => {
        if (e?.target?.value.trim().length === 0) {
            return setOptions(items);
        }
        const reg = new RegExp(e.target.value.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/(\w+)/g, '(?=.*$1)').replace(/ /g, ''), "g");
        setOptions(
            items.filter((i) => i?.label?.toLowerCase().search(reg) !== -1)
        );
    });

    return (
        <div className={styles.selector}>
            <button>
                <span>{ selected[1]?.label || 'Select' }</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' className={styles.chevron}>
                    <path d="M22.95 28.95 16.6 22.6q-.7-.7-.325-1.625.375-.925 1.375-.925h12.7q1 0 1.375.925T31.4 22.6l-6.35 6.35q-.25.25-.5.35-.25.1-.55.1-.3 0-.55-.1-.25-.1-.5-.35Z"/>
                </svg>
            </button>
            <div className={styles.popup}>
                <input ref={input} placeholder='Search' onInput={ search } />
                <div className={styles.list}>
                    {
                        options.map((i, j) =>
                            <div style={{ background: j === selected[0] ? 'var(--primary-transparent)' : 'transparent' }} tabIndex={-1} key={j} onClick={ select.bind(null, j) }>{ i.label }</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}