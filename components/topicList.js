import Link from 'next/link';
import { useRouter } from 'next/router';
import NotFound from 'components/notfound';
import { useCallback } from 'react';
import styles from 'styles/ui/topicList.module.css'
import Tag from './tag';

export default function TopicList({ topics = [] }) {
    const router = useRouter();

    const openTopic = useCallback((link, evt) => {
        if (evt.target.tagName.toLowerCase() !== 'a') {
            router.push(`/topic/${link}`);
        }
    });

    if (topics.length === 0) {
        return <NotFound message="There are no topics that match your search." />
    }

    return (
        <table className={styles.list}>
            <thead className={styles.header}>
                <tr>
                    <th>TOPIC</th>
                    <th>LIKES</th>
                    <th>REPLIES</th>
                    <th>LATEST</th>
                </tr>
            </thead>
            <tbody>
                {
                    topics.map((i) =>
                        <tr onClick={ openTopic.bind(null, i.link) } key={i.link} className={`${styles.row} ${i.answer ? styles.resolved : ''}`}>
                            <td>
                                <div className={styles.title}>{i.title}</div>

                                <div className={styles.tags}>
                                    {
                                        i.tags.map((j) =>
                                            <Tag key={j.link} label={j.label} link={j.link} />
                                        )
                                    }
                                </div>
                            </td>
                            <td>{ i.likesCount }</td>
                            <td>{ i.repliesCount }</td>
                            <td>
                                {
                                    i.latest.map((j) =>
                                        <Link href={`/@${j.username}`} key={j.username}>
                                            <img src={j.image} />
                                        </Link>
                                    )
                                }
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}