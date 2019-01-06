import { define } from "osagai";
import { useTime, observedAttributes } from "../useTime";
import { timeAgo, microTimeAgo } from "../relativeTime";

function TimeAgo({ element }) {
  useTime(element, getFormattedDate);

  function getFormattedDate(date) {
    if (date) {
      const format = element.getAttribute("format");

      if (format === "micro") {
        return microTimeAgo(date);
      }

      return timeAgo(date);
    }
  }
}

define("time-ago", TimeAgo, { observedAttributes });
