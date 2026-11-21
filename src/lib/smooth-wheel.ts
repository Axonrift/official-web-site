export function enableSmoothWheel() {
  const scrollingElement = document.scrollingElement;
  if (!scrollingElement) return;
  const page = scrollingElement;

  let frame = 0;
  let previousTime = 0;
  let position = page.scrollTop;
  let destination = position;
  let lastScrollTop = position;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function animate(time: number) {
    // Yield if the browser moved the page for a link, focus, or a scrollbar drag.
    if (page.scrollTop !== lastScrollTop) {
      stop();
      return;
    }

    const elapsed = Math.max(0, Math.min(time - previousTime, 50));
    previousTime = time;
    const remaining = destination - position;
    const settled = Math.abs(remaining) <= 1;
    position = settled
      ? destination
      : position + remaining * (1 - Math.exp(-elapsed / 75));

    window.scrollTo({ top: position, behavior: "instant" });
    lastScrollTop = page.scrollTop;
    frame = settled ? 0 : requestAnimationFrame(animate);
  }

  function onWheel(event: WheelEvent) {
    const mode = event.deltaMode;
    const delta = event.deltaY;
    if (
      event.defaultPrevented ||
      !event.cancelable ||
      !delta ||
      event.deltaX ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      stop();
      return;
    }

    for (const element of event.composedPath()) {
      if (element === document.body || element === document.documentElement)
        break;
      if (!(element instanceof Element)) continue;
      if (
        element.matches("input, select, textarea, dialog") ||
        (element.scrollHeight > element.clientHeight &&
          /^(auto|scroll|overlay)$/.test(getComputedStyle(element).overflowY))
      ) {
        stop();
        return;
      }
    }

    const unit =
      mode === WheelEvent.DOM_DELTA_PAGE
        ? page.clientHeight
        : mode === WheelEvent.DOM_DELTA_LINE
          ? parseFloat(getComputedStyle(document.body).lineHeight) || 16
          : 1;
    const scrollTop = page.scrollTop;
    const maxScroll = Math.max(0, page.scrollHeight - page.clientHeight);
    const ongoing = frame && scrollTop === lastScrollTop;
    const sameDirection =
      Math.sign(delta) === Math.sign(destination - position);
    const start = ongoing && sameDirection ? destination : scrollTop;
    destination = Math.max(0, Math.min(start + delta * unit, maxScroll));

    if (destination === scrollTop) {
      stop();
      return;
    }

    event.preventDefault();
    if (!ongoing) {
      stop();
      position = lastScrollTop = scrollTop;
      previousTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }

  const interruptions = [
    "pointerdown",
    "touchstart",
    "keydown",
    "hashchange",
    "popstate",
    "resize",
    "blur",
  ] as const;
  window.addEventListener("wheel", onWheel, { passive: false });
  for (const event of interruptions) {
    window.addEventListener(event, stop, { passive: true });
  }

  return () => {
    stop();
    window.removeEventListener("wheel", onWheel);
    for (const event of interruptions) {
      window.removeEventListener(event, stop);
    }
  };
}
