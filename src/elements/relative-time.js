import { define } from "osagai";
import { useTime, observedAttributes } from "../useTime";
import { toString } from "../relativeTime";
import { scheduleFormatter } from "../scheduleFormatter";

function RelativeTime({ element }) {
  useTime(element, getFormattedDate);
  scheduleFormatter(element, getFormattedDate);

  function getFormattedDate(date) {
    if (date) {
      return toString(date);
    }
  }
}

define("relative-time", RelativeTime, { observedAttributes });
