import { define } from "osagai";
import { useTime, observedAttributes } from "../useTime";
import { timeUntil, microTimeUntil } from "../relativeTime";
import { scheduleFormatter } from "../scheduleFormatter";

function TimeUntil({ element }) {
  useTime(element, getFormattedDate);
  scheduleFormatter(element, getFormattedDate);

  function getFormattedDate(date) {
    if (date) {
      const format = element.getAttribute("format");

      if (format === "micro") {
        return microTimeUntil(date);
      }

      return timeUntil(date);
    }
  }
}

define("time-until", TimeUntil, { observedAttributes });
