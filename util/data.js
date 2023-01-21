import LRU from 'lru-cache';

const users = [
    {
        id: '123456789',
        image: '/profile.png',
        username: 'nathanTi',
        name: 'Nathan TILLIER',
        bio: null,
        website: null,
        location: 'Madrid',
        level: 'admin',
        roles: ['moderator']
    }
];

const topics = [
    {
        link: '21012023-lorem-ipsum-dolor-sit-amet',
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, nec consegenitur ba bla bla.\n**Bla bla:**Lorem ipsum\n\n__Lorem ipsum__',
        date: new Date().toString(),
        repliesCount: 1,
        likesCount: 4,
        likedByUser: false,
        author: '123456789',
        answer: 'qwertyuiop',
        category: 'test',
        latest: ['123456789'],
        tags: ['lorem-ipsum']
    },
    {
        link: '20012023-lorem-ipsum-dolor-sit-amet',
        title: 'Lorem ipsum',
        content: 'Lorem ipsum dolor sit amet, nec consegenitur ba bla bla.\n**Bla bla:**Lorem ipsum\n\n__Lorem ipsum__',
        date: new Date().toString(),
        repliesCount: 0,
        likesCount: 0,
        likedByUser: false,
        author: '123456789',
        answer: null,
        category: 'test',
        latest: ['123456789'],
        tags: ['lorem-ipsum', 'ui']
    },
    {
        link: '20012023-an-update',
        title: 'An update',
        content: 'This is an update!',
        date: new Date().toString(),
        repliesCount: 0,
        likesCount: 0,
        likedByUser: false,
        author: '123456789',
        answer: null,
        category: 'updates',
        latest: ['123456789'],
        tags: ['bug']
    },
    {
        link: '20012023-what-do-you-think-of-the-update',
        title: 'What do you think of the update?',
        content: 'This is a question for the users.',
        date: new Date().toString(),
        repliesCount: 0,
        likesCount: 0,
        likedByUser: false,
        author: '123456789',
        answer: null,
        category: 'updates',
        latest: ['123456789'],
        tags: ['ask']
    }
];

const roles = [
    {
        label: 'Moderator',
        id: 'moderator'
    },
    {
        label: 'admin',
        id: 'admin'
    }
];

const categories = [
    {
        id: 'test',
        label: 'Test category',
        color: 'var(--red)',
        canSend: ['everyone']
    },
    {
        id: 'updates',
        label: 'Updates',
        color: 'var(--green)',
        canSend: ['admin']
    }
];

const tags = [
    {
        id: 'ui',
        label: 'UI'
    },
    {
        id: 'bug',
        label: 'Bug'
    },
    {
        id: 'ask',
        label: 'Ask'
    },
    {
        id: 'lorem-ipsum',
        label: 'Lorem ipsum'
    }
];

const levels = [
    {
        label: 'Admin',
        id: 'admin'
    },
    {
        label: 'Master',
        id: 'Master'
    }
];

const replies = [
    {
        to: '21012023-lorem-ipsum-dolor-sit-amet',
        id: 'qwertyuiop',
        content: 'This is an answer!\n```js\nvar i = 0;\n```\n**some important thing**\n\nLorem ipsum',
        date: new Date().toString(),
        repliesCount: 1,
        author: '123456789',
        isReply: false,
    },
    {
        to: 'qwertyuiop',
        id: 'azertyuiop',
        content: 'Some comment to rectify something.',
        date: new Date().toString(),
        repliesCount: 0,
        author: '123456789',
        isReply: true,
    }
];

const userCache = new LRU({
    maxSize: 500,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60
});

const userNameCache = new LRU({
    maxSize: 500,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60
});

const userNotFound = new LRU({
    maxSize: 1000,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60
});

const roleCache = new LRU({
    maxSize: 50,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60 * 24
});

const tagCache = new LRU({
    maxSize: 1000,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60 * 24
});

const topicCache = new LRU({
    maxSize: 500,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60
});

const categoryCache = new LRU({
    maxSize: 25,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60 * 24
});

const levelCache = new LRU({
    maxSize: 5,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60 * 24
});

function setUserCache (id, username, user) {
    if (!user) {
        return userNotFound.set(id || username, true);
    }
    if (id) {
        userCache.set(id, user);
        userNameCache.set(user.username.toLowerCase(), id);
    } else {
        userCache.set(user.id, user);
        userNameCache.set(username.toLowerCase(), user.id);
    }
}

export function getUserById (id) {
    if (userNotFound.has(id)) {
        return null;
    }
    if (userCache.has(id)) {
        return userCache.get(id);
    }
    const user = users.filter((i) => i.id === id)[0];
    setUserCache(id, false, user);
    return user;
}

export function getUserByUsername (u) {
    const username = u.toLowerCase();
    if (userNotFound.has(username)) {
        return null;
    }
    if (userNameCache.has(username)) {
        const user = getUserById(userNameCache.get(username));
        if (user) {
            return user;
        }
    }
    const user = users.filter((i) => i.username.toLowerCase() === username)[0];
    setUserCache(false, username, user)
    return user;
}

export function getTopicByLink (l) {
    const link = l.toLowerCase();
    if (topicCache.has(link)) {
        return topicCache.get(link);
    }
    const topic = topics.filter((i) => i.link === link)[0];
    topicCache.set(link, topic);
    return topic;
}

export function getRoleById(i) {
    const id = i.toLowerCase();
    if (roleCache.has(id)) {
        return roleCache.get(id);
    }
    const role = roles.filter((i) => i.id === id)[0];
    roleCache.set(id, role);
    return role;
}

export function getCategoryById(i) {
    const id = i.toLowerCase();
    if (categoryCache.has(id)) {
        return categoryCache.get(id);
    }
    const category = categories.filter((i) => i.id === id)[0];
    categoryCache.set(id, category);
    return category;
}

export function getTagById (i) {
    const id = i.toLowerCase();
    if (tagCache.has(id)) {
        return tagCache.get(id);
    }
    const tag = tags.filter((i) => i.id === id)[0];
    tagCache.set(id, tag);
    return tag;
}

export function getLevelById (i) {
    const id = i.toLowerCase();
    if (levelCache.has(id)) {
        return levelCache.get(id);
    }
    const level = levels.filter((i) => i.id === id)[0];
    levelCache.set(id, level);
    return level;
}

export function getCategories () {
    return categories;
}

export function getTags () {
    return tags;
}

export function getTopicsInCategory(c) {
    const category = c.toLowerCase();
    return topics.filter((i) => i.category === category);
}

export function getTopicsInCategoryWithTag(c, t) {
    const category = c.toLowerCase();
    const tag = t.toLowerCase();

    return topics.filter((i) => i.category === category && i.tags.includes(tag));
}

export function getTopicsWithTag(t) {
    const tag = t.toLowerCase();
    return topics.filter((i) => i.tags.includes(tag));
}

export function getRepliesFromId(i) {
    const id = i.toLowerCase();
    return replies.filter((i) => i.to === id);
}

export function getReplyById(i) {
    const id = i.toLowerCase();
    return replies.filter((i) => i.id === id)[0];
}

export function getTopics() {
    return topics;
}