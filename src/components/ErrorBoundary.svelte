<!-- ErrorBoundary.svelte -->
<script lang="ts">
  import type { Component } from "svelte";
  import { AppError } from "@/lib/error";

  // Props
  export let fallback:
    | ConstructorOfATypedSvelteComponent
    | Component<any, any, any>
    | null
    | undefined = undefined;

  // State
  let error: Error | AppError | null = null;
  let errorInfo: { componentStack?: string } | null = null;

  // Error handler function
  function handleError(event: Event) {
    event.preventDefault(); // Prevent default handling

    // Extract error from event
    const caughtError =
      event instanceof ErrorEvent
        ? event.error
        : event instanceof PromiseRejectionEvent
          ? event.reason
          : new Error("Unknown error");

    if (caughtError) {
      error = caughtError;
      errorInfo = { componentStack: new Error().stack };
    }

    return false;
  }

  // Reset function
  function reset() {
    error = null;
    errorInfo = null;
  }

  // Helper function to get error code
  function getErrorCode(err: Error | AppError): string {
    if (err instanceof AppError) {
      return err.code;
    }
    return "UNKNOWN_ERROR";
  }
</script>

<!-- Capture global errors -->
<svelte:window
  on:error|preventDefault={handleError}
  on:unhandledrejection|preventDefault={handleError}
/>

{#if error}
  {#if fallback}
    <svelte:component this={fallback} {error} {reset} />
  {:else}
    <!-- Default error UI -->
    <div
      class="w-full max-w-md mx-auto my-8 p-6 rounded-md bg-white border border-tertiary-black-4 shadow-md"
    >
      <div class="flex flex-col items-center text-center gap-4">
        <div
          class="w-14 h-14 flex items-center justify-center rounded-full bg-primary-red-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="w-7 h-7 text-primary-red-2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2
          style="font-family: var(--font-heading)"
          class="text-lg font-semibold text-tertiary-black-2"
        >
          {#if getErrorCode(error) === "UNAUTHORIZED"}
            Authentication Required
          {:else if getErrorCode(error) === "FORBIDDEN"}
            Access Denied
          {:else}
            Something Went Wrong
          {/if}
        </h2>

        <p style="font-family: var(--font-body)" class="text-tertiary-black-1">
          {error.message || "An unexpected error occurred"}
        </p>

        <details class="w-full mt-2 text-left">
          <summary
            class="text-sm text-primary-blue-1 hover:text-primary-blue-2 cursor-pointer transition-colors"
          >
            View technical details
          </summary>
          <pre
            class="mt-2 text-xs bg-tertiary-black-4 bg-opacity-20 p-2 rounded overflow-auto scrollbar-hide max-h-40">
            {error.stack}
            {#if errorInfo?.componentStack}
              {"\n\nComponent Stack:"}
              {errorInfo.componentStack}
            {/if}
          </pre>
        </details>

        <div class="flex gap-3 mt-4">
          <button
            onclick={reset}
            class="px-4 py-2 rounded bg-primary-blue-1 text-white hover:bg-primary-blue-2 transition-colors"
            style="font-family: var(--font-body)"
          >
            Try Again
          </button>

          <button
            onclick={() => window.location.reload()}
            class="px-4 py-2 rounded border border-tertiary-black-3 hover:bg-tertiary-black-4 hover:bg-opacity-30 transition-colors"
            style="font-family: var(--font-body)"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  {/if}
{:else}
  <slot />
{/if}
