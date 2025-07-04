const today = new Date();

const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

const monthNames = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
];

export function formatDateOnly(date: Date) {
    const day = date.getDate();

    const month = date.getMonth();

    const year = date.getFullYear();

    if (date.toDateString() === today.toDateString()) {
        return "сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "вчера";
    } else if (year === today.getFullYear()) {
        return `${day} ${monthNames[month]}`;
    } else {
        return `${day} ${monthNames[month]} ${year}`;
    }
}

export function formatTimeOnly(date: Date) {
    const hours = date.getHours();

    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes}`;
}

export function formatFullDate(date: Date) {
    return `${formatDateOnly(date)} в ${formatTimeOnly(date)}`;
}
