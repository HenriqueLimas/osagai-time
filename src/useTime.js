import { onAttributeChanged } from "osagai/lifecycles";
import { makeFormatter } from "./utils";

export const observedAttributes = [
  "datetime",
  "day",
  "format",
  "hour",
  "minute",
  "month",
  "second",
  "title",
  "weekday",
  "year"
];

export function useTime(element, getFormattedDate) {
  element.getDate = function getDate() {
    return element.__date;
  };

  onAttributeChanged(element, function handleAttributeChange({
    name,
    current
  }) {
    let date;

    if (name === "datetime") {
      const millis = Date.parse(current);
      date = isNaN(millis) ? null : new Date(millis);
    }

    const title = getFormattedTitle(date);
    if (title && !element.hasAttribute("title")) {
      element.setAttribute("title", title);
    }

    const text = getFormattedDate(date);
    if (text) {
      element.textContent = text;
    }

    element.__date = date;
  });
}

function getFormattedTitle(date) {
  if (!date) {
    return;
  }

  const formatter = titleFormatter();
  if (formatter) {
    return formatter.format(date);
  } else {
    try {
      return date.toLocaleString();
    } catch (e) {
      if (e instanceof RangeError) {
        return date.toString();
      } else {
        throw e;
      }
    }
  }
}

const titleFormatter = makeFormatter({
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short"
});
