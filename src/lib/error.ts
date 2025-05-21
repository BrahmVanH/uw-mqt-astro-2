import * as Sentry from "@sentry/astro";
import placeholderImg from "@/image/placeholder.svg";
import type { AstroGlobal, ImageMetadata } from "astro";

export async function onError(errorText: string, context?: AstroGlobal) {
  const error = new Error(errorText);

  // Always log to console in development
  if (import.meta.env.DEV) {
    console.error(error);
    return;
  }

  // In production, send to Sentry and redirect
  if (import.meta.env.PROD) {
    Sentry.captureException(error);
  }
  // Handle server-side
  if (context?.redirect) {
    // use 307 for semantics
    if (import.meta.env.DEV) console.error("redirecting to /404 w/ 307 status");

    return context.redirect("/404", 307);
  }

  // Handle client-side
  if (import.meta.env.DEV) console.error("redirecting to /404 w/ 307 status");
  if (typeof window !== "undefined") {
    if (import.meta.env.DEV)
      console.error(
        "redirecting to /404 via window object - no Astro.redirect option",
      );

    window.location.href = "/404";
  }
}

export function onImageError(errorText: string): ImageMetadata {
  const error = new Error(errorText);

  if (import.meta.env.DEV) {
    console.error(error);
  }

  if (import.meta.env.PROD) {
    Sentry.captureException(error);
  }

  return placeholderImg;
}

// Helper for components to provide default values when data is missing
export function getDefaultProps<T>(propName: string, context?: AstroGlobal): T {
  onError(`Missing required ${propName} data`, context);
  return {} as T;
}

export function getDefaultPageProps(
  errorMessage: string,
  context?: AstroGlobal,
) {
  onError(`Missing page data: ${errorMessage}`, context);

  // Return a Response object with status 404
  return new Response(errorMessage, {
    status: 404,
    statusText: "Not Found",
  });
}

// returns default props manually without using existing function or throwing any errors with console.warn from input prop message
export function gracefullyGetDefaultProps<T>(propName: string): T {
  console.warn(`Missing required ${propName} data`);
  return {} as T;
}
