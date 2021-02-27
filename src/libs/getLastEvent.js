
let lastEvent
const events = ['click', 'touchstart','mousedown','keydown'];
events.forEach((eventType) => {
  document.addEventListener(
    eventType,
    (event) => {
        // console.log('event',event),
      lastEvent = event;
    },
    { capture: true, passive: true }
  );
});
// console.log('lastEvent222', lastEvent);
export default function () {
  return lastEvent;
}