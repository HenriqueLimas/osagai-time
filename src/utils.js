const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function pad(num) {
  return `0${num}`.slice(-2);
}

export function strftime(time, formatString) {
  const day = time.getDay();
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, function(_arg) {
    let match;
    const modifier = _arg[1];
    switch (modifier) {
      case "%":
        return "%";
      case "a":
        return weekdays[day].slice(0, 3);
      case "A":
        return weekdays[day];
      case "b":
        return months[month].slice(0, 3);
      case "B":
        return months[month];
      case "c":
        return time.toString();
      case "d":
        return pad(date);
      case "e":
        return date;
      case "H":
        return pad(hour);
      case "I":
        return pad(strftime(time, "%l"));
      case "l":
        if (hour === 0 || hour === 12) {
          return 12;
        } else {
          return (hour + 12) % 12;
        }
      case "m":
        return pad(month + 1);
      case "M":
        return pad(minute);
      case "p":
        if (hour > 11) {
          return "PM";
        } else {
          return "AM";
        }
      case "P":
        if (hour > 11) {
          return "pm";
        } else {
          return "am";
        }
      case "S":
        return pad(second);
      case "w":
        return day;
      case "y":
        return pad(year % 100);
      case "Y":
        return year;
      case "Z":
        match = time.toString().match(/\((\w+)\)$/);
        return match ? match[1] : "";
      case "z":
        match = time.toString().match(/\w([+-]\d\d\d\d) /);
        return match ? match[1] : "";
    }
  });
}
export function makeFormatter(options) {
  let format;
  return function() {
    if (format) return format;
    if ("Intl" in window) {
      try {
        format = new Intl.DateTimeFormat(undefined, options);
        return format;
      } catch (e) {
        if (!(e instanceof RangeError)) {
          throw e;
        }
      }
    }
  };
}

let dayFirst = null;
const dayFirstFormatter = makeFormatter({ day: "numeric", month: "short" });

export function isDayFirst() {
  if (dayFirst !== null) {
    return dayFirst;
  }

  const formatter = dayFirstFormatter();
  if (formatter) {
    const output = formatter.format(new Date(0));
    dayFirst = !!output.match(/^\d/);
    return dayFirst;
  } else {
    return false;
  }
}

export function isThisYear(date) {
  const now = new Date();
  return now.getUTCFullYear() === date.getUTCFullYear();
}

let yearSeparator = null;
const yearFormatter = makeFormatter({
  day: "numeric",
  month: "short",
  year: "numeric"
});

export function isYearSeparator() {
  if (yearSeparator !== null) {
    return yearSeparator;
  }

  const formatter = yearFormatter();
  if (formatter) {
    const output = formatter.format(new Date(0));
    yearSeparator = !!output.match(/\d,/);
    return yearSeparator;
  } else {
    return true;
  }
}
