
const limits = [
    {
        limit: 60,
        say: 's'//'second'
    },
    {
        limit: 60,
        say: 'm'//'minute'
    },
    {
        limit: 24,
        say: 'h'//'hour'
    },
    {
        limit: 7,
        say: 'd'//'day'
    },
    {
        limit: 4.34524,
        say: 'w'//'week'
    },
    {
        limit: 12,
        say: 'm'//'month'
    },
    {
        limit: Infinity,
        say: 'year'
    }
];

const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export function timeAgo(a, b) {
    try {
        let n = Math.floor(((new Date(b).getTime() || Date.now()) - new Date(a).getTime()) / 1000);

        if (n === 0) return 'now';

        for (var i = 0; i < limits.length; i++) {
            const item = limits[i];
            if (n < item.limit) {
                return `${n}${item.say} ago`;
                if (n < 2) {
                    return `${n} ${item.say} ago`;
                } else {
                    return `${n} ${item.say}s ago`;
                }
            } else {
                n = Math.floor(n / item.limit);
            }
        }
    } catch (err) { return null; }
}


export function getTime(date) {
    try {
        const d = new Date(date);
        return months[d.getMonth()] + ' ' + d.getDay() + ', ' + d.getFullYear()
    } catch (err) {
        return 'err';
    }
}