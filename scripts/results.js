const resultCounterSelector = "#results [data-count]";
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const formatResultCount = (value, counter) => {
  const roundedValue = Math.round(value);
  const number = counter.hasAttribute("data-grouped")
    ? roundedValue.toLocaleString("uk-UA").replace(/\u00a0/g, " ")
    : String(roundedValue);

  return `${number}${counter.dataset.suffix ?? ""}`;
};

const showFinalResultCount = (counter) => {
  counter.textContent = formatResultCount(Number(counter.dataset.count), counter);
};

const animateResultCount = (counter) => {
  if (counter.dataset.animated === "true") {
    return;
  }

  counter.dataset.animated = "true";

  if (reduceMotionQuery.matches) {
    showFinalResultCount(counter);
    return;
  }

  const target = Number(counter.dataset.count);
  const duration = 1600;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    counter.textContent = formatResultCount(target * easedProgress, counter);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      showFinalResultCount(counter);
    }
  };

  requestAnimationFrame(update);
};

const initializeResultCounters = (root = document) => {
  const counters = root.matches?.(resultCounterSelector)
    ? [root]
    : [...root.querySelectorAll?.(resultCounterSelector) ?? []];

  counters.forEach((counter) => {
    if (counter.dataset.counterReady === "true") {
      return;
    }

    counter.dataset.counterReady = "true";
    counter.textContent = formatResultCount(0, counter);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateResultCount(counter);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(counter);
  });
};

document.addEventListener("DOMContentLoaded", () => initializeResultCounters());
document.body.addEventListener("htmx:load", (event) => initializeResultCounters(event.target));
