import { onConnected, onDisconnected } from "osagai/lifecycles";

const nowElements = new Set();

let updateNowIntervalId;

export function scheduleFormatter(element, getFormattedDate) {
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

  function updateNowElements() {
    nowElements.forEach(element => {
      element.textContent = getFormattedDate(element.getDate());
    });
  }
}
