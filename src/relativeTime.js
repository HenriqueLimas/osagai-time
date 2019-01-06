import { isDayFirst, isYearSeparator, isThisYear, strftime } from "./utils";

export function toString(date) {
  const ago = timeElapsed(date);

  if (ago) {
    return ago;
  }

  return timeAhead(date) || `on ${formatDate(date)}`;
}

export function timeElapsed(date) {
  const ms = new Date().getTime() - date.getTime();
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);

  return ms >= 0 && day < 30 ? timeAgoFromMs(ms) : null;
}

export function timeAhead(date) {
  const ms = date.getTime() - new Date().getTime();
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);

  return ms >= 0 && day < 30 ? timeUntil(date) : null;
}

export function timeAgoFromMs(ms) {
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const month = Math.round(day / 30);
  const year = Math.round(month / 12);

  if (ms < 0 || sec < 10) {
    return "just now";
  } else if (sec < 45) {
    return `${sec} seconds ago`;
  } else if (sec < 90) {
    return "a minute ago";
  } else if (min < 45) {
    return `${min} minutes ago`;
  } else if (min < 90) {
    return "an hour ago";
  } else if (hr < 24) {
    return `${hr} hours ago`;
  } else if (hr < 36) {
    return "a day ago";
  } else if (day < 30) {
    return `${day} days ago`;
  } else if (day < 45) {
    return "a month ago";
  } else if (month < 12) {
    return `${month} months ago`;
  } else if (month < 18) {
    return "a year ago";
  } else {
    return `${year} years ago`;
  }
}

export function timeUntil(date) {
  const ms = date.getTime() - new Date().getTime();
  return timeUntilFromMs(ms);
}

export function timeUntilFromMs(ms) {
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const month = Math.round(day / 30);
  const year = Math.round(month / 12);

  if (month >= 18) {
    return `${year} years from now`;
  } else if (month >= 12) {
    return "a year from now";
  } else if (day >= 45) {
    return `${month} months from now`;
  } else if (day >= 30) {
    return "a month from now";
  } else if (hr >= 36) {
    return `${day} days from now`;
  } else if (hr >= 24) {
    return "a day from now";
  } else if (min >= 90) {
    return `${hr} hours from now`;
  } else if (min >= 45) {
    return "an hour from now";
  } else if (sec >= 90) {
    return `${min} minutes from now`;
  } else if (sec >= 45) {
    return "a minute from now";
  } else if (sec >= 10) {
    return `${sec} seconds from now`;
  } else {
    return "just now";
  }
}

export function microTimeUntil(date) {
  const ms = date.getTime() - new Date().getTime();
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const month = Math.round(day / 30);
  const year = Math.round(month / 12);
  if (day >= 365) {
    return `${year}y`;
  } else if (hr >= 24) {
    return `${day}d`;
  } else if (min >= 60) {
    return `${hr}h`;
  } else if (min > 1) {
    return `${min}m`;
  } else {
    return "1m";
  }
}

export function formatDate(date) {
  let format = isDayFirst() ? "%e %b" : "%b %e";
  if (!isThisYear(date)) {
    format += isYearSeparator() ? ", %Y" : " %Y";
  }

  return strftime(date, format);
}
