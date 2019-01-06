import { define } from "osagai";
import { onConnected, onDisconnected } from "osagai/lifecycles";
import { useTime, observedAttributes } from "../useTime";
import { toString } from "../relativeTime";

function RelativeTime({ element }) {
  useTime(element, getFormattedDate);

  onConnected(element, function connectedCallback() {
    nowElements.add(element);

    if (!updateNowIntervalId) {
      updateNowElements();

      updateNowIntervalId = setInterval(updateNowElements, 60 * 1000);
    }
  });

  onDisconnected(element, function disconnectedCallback() {
    nowElements.delete(element);

    if (!nowElements.size && updateNowIntervalId) {
      clearInterval(updateNowIntervalId);
      updateNowIntervalId = null;
    }
  });
}

function getFormattedDate(date) {
  if (date) {
    return toString(date);
  }
}

const nowElements = new Set();

let updateNowIntervalId;

function updateNowElements() {
  nowElements.forEach(element => {
    element.textContent = getFormattedDate(element.getDate());
  });
}

define("relative-time", RelativeTime, { observedAttributes });
