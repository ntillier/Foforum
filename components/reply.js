import Link from "next/link";
import Role from "./roles";
import styles from 'styles/ui/reply.module.css';
import { timeAgo } from "util/time";
import UserBar from "./userbar";
import { parse, format } from "util/parse";
import { useReactions } from "contexts/prefs";
import { useState } from "react";
import useToggle from "hooks/toogle";
import Loading from "./loading";
import get from "util/fetch";


export default function Reply({ id = '', author = {}, content = '', date = new Date(), bestAnswer = false, reactions = [], repliesCount = 0, isReply = false }) {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useToggle(true);
    const [pageInfo, setPageInfo] = useState(null);
    const react = useReactions();

    function fetchMoreReplies () {
        setLoading(true);
        get(
            'getReplies',
            'query($id: String!, $cursor: String) { getReplies(of: $id, cursor: $cursor) { items { ... on Reply { content date author { image username name level { label id } } } } pageInfo { hasNextPage nextCursor } } }',
            {
                id: id,
                cursor: pageInfo?.nextCursor
            }
        )
            .then((obj) => {
                setPageInfo(obj.pageInfo);
                setLoading(false);
                setReplies((i) => [...i, ...obj.items]);
            })
    }

    function toogleReplies () {
        if (showReplies === true) {
            return setShowReplies(false);
        }
        setShowReplies(true);
        if (!pageInfo) {
            fetchMoreReplies();
        }
    }

    return (
        <div className={`${styles.reply} ${ isReply ? '' : styles.notreply }`}>
            <UserBar
                user={author}
                subtitle={ timeAgo(date) }
                bestAnswer={bestAnswer}
            >
                {  bestAnswer && <span className={styles.best}>Best answer</span> }
            </UserBar>
            <div className={styles.content}>{ format(content) }</div>
            <div className={styles.bar}>
                <div className={styles.react}>
                    <button className={styles.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 48 48">
                            <path fill="currentColor" d="M24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q2.4 0 4.625.525T32.85 6.05q-.2.45-.275.925Q32.5 7.45 32.5 8q0 .35.025.675.025.325.125.675-1.9-1.15-4.075-1.75Q26.4 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41q7.1 0 12.05-4.975Q41 31.05 41 24q0-1.9-.4-3.725-.4-1.825-1.15-3.425.55.3 1.2.475.65.175 1.35.175h.45q.2 0 .45-.05.55 1.55.825 3.175Q44 22.25 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm7.3-22.65q1.15 0 1.925-.775Q34 19.8 34 18.65t-.775-1.925q-.775-.775-1.925-.775t-1.925.775q-.775.775-.775 1.925t.775 1.925q.775.775 1.925.775Zm-14.6 0q1.15 0 1.925-.775.775-.775.775-1.925t-.775-1.925q-.775-.775-1.925-.775t-1.925.775Q14 17.5 14 18.65t.775 1.925q.775.775 1.925.775Zm7.3 13.6q3.3 0 6.075-1.775Q32.85 31.4 34.1 28.35H13.9q1.3 3.05 4.05 4.825Q20.7 34.95 24 34.95ZM24 24ZM40.5 9.5H38q-.65 0-1.075-.425Q36.5 8.65 36.5 8q0-.65.425-1.075Q37.35 6.5 38 6.5h2.5V4q0-.65.425-1.075Q41.35 2.5 42 2.5q.65 0 1.075.425Q43.5 3.35 43.5 4v2.5H46q.65 0 1.075.425Q47.5 7.35 47.5 8q0 .65-.425 1.075Q46.65 9.5 46 9.5h-2.5V12q0 .65-.425 1.075-.425.425-1.075.425-.65 0-1.075-.425Q40.5 12.65 40.5 12Z"/>
                        </svg>
                    </button>
                    <div className={styles.choose}>
                        {
                            react.map((i) =>
                                <img tabIndex={-1} alt="" key={i} src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/${i}.svg`} />
                            )
                        }
                    </div>
                </div>
                {
                    reactions.length > 0 &&
                        <div className={styles.reactions}>
                            {
                                reactions.map((i) => 
                                    <button className={styles.reaction} key={i.emoji}>
                                        <img alt="" width="14" height="14" src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/${i.emoji}.svg`} />
                                        <span>{ i.count }</span>
                                    </button>
                                )
                            }
                        </div>
                }
                <hr />
                <button className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 48 48">
                        <path fill="currentColor" d="M40.5 38q-.65 0-1.075-.425Q39 37.15 39 36.5v-7.2q0-2.7-1.9-4.6-1.9-1.9-4.6-1.9H11.7l6.7 6.7q.4.4.4 1t-.45 1.05q-.45.45-1.05.45-.6 0-1.05-.45l-9.2-9.2q-.25-.25-.35-.5-.1-.25-.1-.55 0-.3.1-.55.1-.25.35-.5L16.3 11q.4-.4 1-.4t1.05.45q.45.45.45 1.05 0 .6-.45 1.05L11.7 19.8h20.8q3.9 0 6.7 2.775Q42 25.35 42 29.3v7.2q0 .65-.425 1.075Q41.15 38 40.5 38Z"/>
                    </svg>
                </button>
                {
                    (repliesCount > 0 && isReply === false) &&
                        <>
                            <hr />
                            <button className={styles.button} onClick={toogleReplies}>
                                { repliesCount } replies
                            </button>
                        </>
                }
            </div>
            {
                (!isReply && showReplies) &&
                    <div className={styles.replies}>
                        {
                            replies.map((i) => 
                                <Reply
                                    key={i.id}
                                    content={i.content}
                                    isReply={true}
                                    reactions={i.reactions}
                                    repliesCount={0}
                                    author={i.author}
                                    date={i.date}
                                />
                            )
                        }
                        {
                            (!loading && pageInfo?.hasNextPage) &&
                                <button className={styles.fetch} onClick={fetchMoreReplies}>More</button>
                        }
                        {
                            loading &&
                                <Loading />
                        }
                    </div>
            }
        </div>
    );
}