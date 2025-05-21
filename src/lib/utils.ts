import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_ROOT_URL_CLNT } from "astro:env/client";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isExternalUrl = (url: string) => {
  if (!url) return false;

  // Handle URLs that start with our app root as internal
  if (url.startsWith(APP_ROOT_URL_CLNT) || url.startsWith("/")) {
    return false;
  }

  // All other URLs are considered external
  return true;
};

// this function removes the last sentence from a text string
export function removeLastSentence(text: string): string {
  return text.split(".").slice(0, -2) + ".";
}
// returns a string preview of a text string with the the first specified number of characters minus 3 plus 3 dots
export function getStringPreview(text: string, length: number = 200): string {
  return text.slice(0, length - 3) + "...";
}

// replaces the word "and" with an ampersand in a text string
export function formatHeroHeadingText(text: string): string {
  return text.toLocaleLowerCase().replace(" and ", " & ").toUpperCase();
}

// checks if the browser supports webp images
export function supportsWebP(request: Request): boolean {
  const accept = request.headers.get("Accept") ?? "";
  return accept.includes("image/webp");
}

interface CheckForFocusElementReturnObject {
  found: boolean;
  id?: string;
}
export function checkAndGetUrlFocusElement(
  url: string,
  ids: string[],
): CheckForFocusElementReturnObject {
  const urlParts = url.split("#");
  const urlHash = urlParts[1];

  const found = ids.includes(urlHash);
  if (found && urlHash) {
    return { found, id: urlHash };
  }

  return { found };
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 },
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number],
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (
    style: Record<string, number | string | undefined>,
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};
