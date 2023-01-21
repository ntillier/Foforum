import CategoryMenu from "components/categoryMenu";
import Loading from "components/loading";
import TopicList from "components/topicList";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import get from "util/fetch";

export default function Tag() {
    const router = useRouter();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageInfo, setPageInfo] = useState({ nextCursor: null, hasNextPage: true });

    function loadMore (erase = false) {
        get(
            'topicsWithTag',
            'query($tag: String!) { topicsWithTag(tag: $tag) { items { ... on Topic { title likesCount repliesCount link answer { id } latest { image username } tags { label id } } } pageInfo { hasNextPage nextCursor } } }',
            {
                tag: router.query.tag,
                cursor: erase ? null : pageInfo.nextCursor
            }
        )
            .then((obj) => {
                if (erase) {
                    setTopics(obj.items);
                } else {
                    setTopics((t) => [...t, ...obj.items]);
                }
                setPageInfo(obj.pageInfo);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (typeof window === undefined) {
            return;
        }
        loadMore(true);
    }, [router.query.tag]);

    return (
        <div style={{ padding: '8px' }}>
            <CategoryMenu />
            {
                loading &&
                <Loading />
            }
            {
                !loading &&
                <TopicList topics={topics} />
            }
            {
                pageInfo.hasNextPage &&
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
                        <a style={{ cursor: 'pointer' }} onClick={loadMore}>More</a>
                    </div>
            }
        </div>
    );
}