import { getCategories, getCategoryById, getLevelById, getRepliesFromId, getReplyById, getRoleById, getTagById, getTags, getTopicByLink, getTopics, getTopicsInCategory, getTopicsInCategoryWithTag, getTopicsWithTag, getUserById, getUserByUsername } from "./data";

// (parent, args, user, info)
const resolvers = {
    Query: {
        userById(_, { id }) {
            return getUserById(id);
        },
        userByUsername(_, { username }) {
            return getUserByUsername(username);
        },
        topicByLink(_, { link }) {
            return getTopicByLink(link);
        },
        categoryById(_, { id }) {
            return getCategoryById(id);
        },
        getCategories() {
            return [];
        },
        getTags() {
            return [];
        },
        topicsInCategory(_, { category, tag }) {
            return {
                items: tag ? getTopicsInCategoryWithTag(category, tag) : getTopicsInCategory(category),
                pageInfo: {
                    hasNextPage: false,
                    nextCursor: null
                }
            }
        },
        topicsWithTag(_, { tag }) {
            return {
                items: getTopicsWithTag(tag),
                pageInfo: {
                    hasNextPage: false,
                    nextCursor: null,
                }
            }
        },
        getPreferences() {
            return {
                categories: getCategories(),
                tags: getTags(),
                sidebar: {
                    categories: ['test'],
                    tags: ['lorem-ipsum', 'bug', 'ui']
                }
            };
        },
        getReplies(_, { of, cursor }) {
            console.log(cursor);
            return {
                items: getRepliesFromId(of),
                pageInfo: {
                    hasNextPage: false,
                    nextCursor: null
                }
            }
        },
        trendingTopics() {
            return {
                items: getTopics(),
                pageInfo: {
                    hasNextPage: false,
                    nextCursor: null
                }
            };
        }
    },
    Topic: {
        author({ author }) {
            return getUserById(author);
        },
        category({ category }) {
            return getCategoryById(category);
        },
        tags({ tags }) {
            return tags.map((i) => getTagById(i));
        },
        replies({ link }) {
            return {
                items: getRepliesFromId(link),
                pageInfo: {
                    hasNextPage: false,
                    cursor: null
                }
            }
        },
        answer({ answer }) {
            if (answer) {
                return getReplyById(answer);
            }
            return null;
        },
        latest({ latest }) {
            return latest.map(getUserById);
        }
    },
    User: {
        roles({ roles }) {
            return roles.map((i) => getRoleById(i));
        },
        level ({ level }) {
            return getLevelById(level);
        }
    },
    Sidebar: {
        categories({ categories }) {
            return categories.map((i) => getCategoryById(i));
        },
        tags({ tags }) {
            return tags.map((i) => getTagById(i));
        }
    },
    Reply: {
        author ({ author }) {
            return getUserById(author);
        },
        replies ({ id }) {
            return getRepliesFromId(id);
        },
        reactions () {
            return [];
        }
    },
    Pageable: {
        __resolveType (obj) {
            return obj.title ? 'Topic' : 'Reply';
        }
    }
};

export default resolvers;