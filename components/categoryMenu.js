import Select from "./select"
import Selector from "./selector"
import { useRouter } from "next/router";
import { useCategories, useTags } from "contexts/prefs";
import styles from 'styles/global/categories.module.css';
import { setSorting } from "contexts/prefs";

export default function CategoryMenu() {
    const router = useRouter();
    const categories = useCategories();
    const tags = useTags();

    function resetCategory () {
        if (router.query.tag) {
            return router.push(`/tag/${router.query.tag}`);
        }
        router.push('/categories');
    }

    function resetTag () {
        if (router.query.category) {
            return router.push(`/c/${router.query.category}`);
        }
        router.push('/categories');
    }

    function changeCategory (id) {
        if (router.query.tag) {
            return router.push(`/c/${id}/${router.query.tag}`);
        }
        router.push(`/c/${id}`);
    }

    function changeTag (tag) {
        if (!router.query.category) {
            return router.push(`/tag/${tag}`);
        }
        router.push(`/c/${router.query.category}/${tag}`)
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menuPart}>
                <Selector 
                    items={[
                        {
                            label: 'All categories',
                            onSelect: resetCategory
                        },
                        ...categories.map((i) => {
                            return {
                                label: i.label,
                                onSelect: changeCategory.bind(null, i.id)
                            }
                        })
                    ]}
                    initial={ categories.findIndex(i => i.id === router.query.category) + 1 }
                />
                <Selector
                    items={[
                        {
                            label: 'All tags',
                            onSelect: resetTag
                        },
                        ...tags.map((i, j) => {
                            return {
                                label: i.label,
                                onSelect: changeTag.bind(null, i.id)
                            }
                        })
                    ]}
                    initial={ tags.findIndex(i => i.id === router.query.tag) + 1 }
                />
            </div>
            <Select onChange={ setSorting } items={[{ label: 'Latest', id: 'latest' }, { label: 'Top', id: 'top' }, { label: 'Votes', id: 'votes' }, { label: 'Replies', id: 'replies' }]} />
        </div>
    )
}