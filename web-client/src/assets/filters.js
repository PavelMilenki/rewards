export default function dateFormat(date) {
    const formattedDate = new Date(date);
    const intervals = [
        {label: 'hour', seconds: 3600},
        {label: 'minute', seconds: 60},
        {label: 'second', seconds: 1},
    ];
    const seconds = Math.floor((Date.now() - formattedDate.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds) || {label: 'second', seconds: 1};
    const count = Math.floor(seconds / interval.seconds);
    if (seconds < 86400) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    } else return formattedDate.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
}
