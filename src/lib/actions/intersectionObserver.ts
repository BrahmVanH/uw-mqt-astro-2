export interface InViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

export function inView(
  node: HTMLElement,
  options: InViewOptions = {}
): { destroy(): void } {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true
  } = options;

  let observer: IntersectionObserver;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        node.dispatchEvent(new CustomEvent('inView'));
        if (once) {
          observer.unobserve(node);
        }
      } else if (!once) {
        node.dispatchEvent(new CustomEvent('outOfView'));
      }
    });
  };

  observer = new IntersectionObserver(handleIntersect, {
    threshold,
    rootMargin
  });

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}