import Role from 'components/roles';
import styles from 'styles/global/topic.module.css';
import { timeAgo } from 'util/time';
import Link from 'next/link';
import Reply from 'components/reply';
import UserBar from 'components/userbar';
import { format } from 'util/parse';
import { useEffect, useState } from 'react';
import get from 'util/fetch';
import Loading from 'components/loading';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';

export default function Topic(props) {
    const [loading, setLoading] = useState(true);
    const [topic, setTopic] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!window) {
            return;
        }
        get(
            'topicByLink',
            'query ($link: String!) { topicByLink (link: $link) { content title repliesCount likesCount replies { items { ... on Reply { content repliesCount id author { image username name level { label id } } } } } answer { content repliesCount id author { image username name level { label id } } } author { username name image level { label id } } } }',
            {
                link: props.link
            }
        )
            .then((obj) => {
                obj.date = new Date(obj.date);
                setTopic(obj);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    if (!loading && !topic) {
        return (
            <NotFound />
        );
    }

    return (
        <div className={styles.topic}>
            {
                loading &&
                <Loading />
            }
            {
                loading === false &&
                <>
                    <div className={styles.post}>
                        <div className={styles.title}>{topic.title}</div>
                        <UserBar
                            user={topic.author}
                            subtitle={timeAgo(topic.date)}
                        />
                        <div className={styles.content}>{format(topic.content)}</div>
                        <div className={styles.topicBar}>
                            <div className={`${styles.like} ${topic.likedByUser ? styles.liked : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox='0 0 48 48'>
                                    <path d="m21.95 40.2-2.65-2.45Q13.1 32 8.55 26.775T4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.55 0 5.05 1.225T24 10.55q2.2-2.8 4.55-4.025Q30.9 5.3 33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 5.7-4.55 10.925Q34.9 32 28.7 37.75l-2.65 2.45q-.85.8-2.05.8-1.2 0-2.05-.8Zm.75-26.35q-1.35-2.45-3.55-4-2.2-1.55-4.65-1.55-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 2.9 1.95 6.075Q10.9 25.1 13.6 28.1t5.6 5.575Q22.1 36.25 24 38q1.9-1.7 4.8-4.3 2.9-2.6 5.6-5.625 2.7-3.025 4.65-6.2Q41 18.7 41 15.85q0-3.3-2.125-5.425T33.5 8.3q-2.5 0-4.675 1.525T25.2 13.85q-.25.4-.55.575-.3.175-.7.175-.4 0-.725-.175-.325-.175-.525-.575Zm1.3 9.3Z" />
                                </svg>
                                <span>{topic.likesCount}</span>
                            </div>
                            <div>{topic.repliesCount} replies</div>
                        </div>
                    </div>
                    <div className={styles.replies}>
                        {
                            topic.answer &&
                            <Reply
                                id={topic.answer.id}
                                author={topic.answer.author}
                                content={topic.answer.content}
                                bestAnswer={true}
                                reactions={topic.answer.reactions}
                                repliesCount={topic.answer.repliesCount}
                            />
                        }
                        {
                            topic.replies.items.map((i) => {
                                if (i.id !== topic.answer.id) {
                                    return <Reply
                                        key={i.id}
                                        id={i.id}
                                        author={i.author}
                                        content={i.content}
                                        bestAnswer={i.id === topic.answer?.id}
                                        repliesCount={i.repliesCount}
                                    />
                                }
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
}

export function getServerSideProps({ query }) {
    return {
        props: query
    }
}