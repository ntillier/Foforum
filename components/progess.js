import { closeMenu } from "contexts/prefs";
import Router from "next/router";
import { useRef, useEffect } from "react";

export default function Progress() {
    const bar = useRef();
    let isWaiting = false;

    function startTransition () {
        closeMenu();
        bar.current.style.width = '35%';
        bar.current.style.height = '2px';
        isWaiting = true;
    }

    function endTransition () {
        bar.current.style.width = '100%';
        isWaiting = false;
    }

    useEffect(() => {
        Router.events.on('routeChangeStart', startTransition);
        Router.events.on('routeChangeComplete', endTransition);
        Router.events.on('routeChangeError', (err) => {
            console.log('routechangeroor');
        });
        bar.current.addEventListener('transitionend', () => {
            if (!isWaiting) {
                bar.current.style.height = '0px';
                bar.current.style.width = '0px';
            }
        });
    }, []);

    return (
        <div ref={bar} style={{ width: '2px', position: 'absolute', borderRadius: '0 10px 10px 0', background: 'var(--secondary-three)', transition: '200ms ease-out', zIndex: 50 }} ></div>
    );
}