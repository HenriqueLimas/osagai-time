import { define } from "osagai";
import { useTime, observedAttributes } from "./useTime";
import { strftime, makeFormatter, isDayFirst } from "./utils";

function LocalTime({ element }) {
  useTime(element, getFormattedDate);

  function getFormattedDate(date) {
    if (!date) {
      return;
    }

    const dateText = formatDate(element, date);
    const timeText = formatTime(element, date);

    return `${dateText} ${timeText}`.trim();
  }
}

function formatDate(element, date) {
  const props = {
    weekday: {
      short: "%a",
      long: "%A"
    },
    day: {
      numeric: "%e",
      "2-digit": "%d"
    },
    month: {
      short: "%b",
      long: "%B"
    },
    year: {
      numeric: "%Y",
      "2-digit": "%y"
    }
  };

  let format = isDayFirst()
    ? "weekday day month year"
    : "weekday month day, year";

  for (const prop in props) {
    const value = props[prop][element.getAttribute(prop)];
    format = format.replace(prop, value || "");
  }

  format = format.replace(/(\s,)|(,\s$)/, "");

  return strftime(date, format)
    .replace(/\s+/, " ")
    .trim();
}

function formatTime(element, date) {
  const options = {
    hour: element.getAttribute("hour"),
    minute: element.getAttribute("minute"),
    second: element.getAttribute("second"),
    timeZoneName: element.getAttribute("time-zone-name")
  };

  for (const opt in options) {
    if (!options[opt]) {
      delete options[opt];
    }
  }

  if (Object.keys(options).length === 0) {
    return "";
  }

  const formatter = makeFormatter(options)();
  if (formatter) {
    return formatter.format(date);
  } else {
    const timef = options.second ? "%H:%M:%S" : "%H:%M";
    return strftime(date, timef);
  }
}

define("local-time", LocalTime, { observedAttributes });
