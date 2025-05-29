<script lang="ts">
  import { AppError, ErrorCode } from "@/lib/error";
  import { cn } from "@/lib/utils";

  // Props
  export let error: Error | AppError;
  export let reset: (() => void) | undefined = undefined;
  export let className: string = "";

  function getErrorCode(err: Error | AppError): ErrorCode {
    if (err instanceof AppError) {
      return err.code;
    }
    return ErrorCode.UNKNOWN_ERROR;
  }

  function getIsRetryable(err: Error | AppError): boolean {
    if (err instanceof AppError) {
      return err.isRetryable;
    }
    return true;
  }

  // Computed properties
  $: errorCode = getErrorCode(error);
  $: isRetryable = getIsRetryable(error);

  // Methods
  function getErrorMessage() {
    switch (errorCode) {
      case ErrorCode.NETWORK_ERROR:
        return "We're having trouble connecting to the server. Please check your connection.";
      case ErrorCode.PROGRAM_NOT_FOUND:
        return "We couldn't find the property you were looking for.";
      case ErrorCode.UNAUTHORIZED:
        return "You don't have permission to view this content.";
      default:
        return "Something unexpected happened. We're looking into it.";
    }
  }

  function reloadPage() {
    window.location.reload();
  }
</script>

<div
  class={cn(
    "rounded-md border-2 border-primary-red-3 bg-primary-red-4 bg-opacity-30 p-4 my-4",
    "animate-[fadeIn_0.3s_ease-in-out]",
    className,
  )}
  style="font-family: var(--font-body);"
>
  <div class="flex">
    <div class="flex-shrink-0 mt-0.5">
      <div
        class="w-6 h-6 flex items-center justify-center rounded-full bg-primary-red-2"
      >
        <svg
          class="h-4 w-4 text-tertiary-white-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div class="ml-3 flex-1">
      <h3
        class="text-md font-semibold text-tertiary-black-2"
        style="font-family: var(--font-heading);"
      >
        {getErrorMessage()}
      </h3>

      {#if error instanceof AppError}
        <div
          class="mt-2 text-tertiary-black-1"
          style="font-size: var(--font-size-sm);"
        >
          <p>{error.message}</p>

          {#if error.context}
            <details class="mt-2 group">
              <summary
                class="cursor-pointer text-xs text-primary-blue-1 hover:text-primary-blue-2 transition-colors"
              >
                Technical details
              </summary>
              <pre
                class="mt-2 text-xs overflow-auto scrollbar-hide p-2 rounded bg-tertiary-black-4 bg-opacity-20 max-h-40">
                {JSON.stringify(error.context, null, 2)}
              </pre>
            </details>
          {/if}
        </div>
      {/if}

      <div class="mt-4 flex gap-2">
        {#if isRetryable && reset}
          <button
            type="button"
            onclick={reset}
            class="rounded-md bg-primary-red-2 px-3 py-1.5 text-tertiary-white-1 hover:bg-primary-red-1 transition-colors"
            style="font-size: var(--font-size-sm);"
          >
            Try again
          </button>
        {/if}

        <button
          type="button"
          onclick={reloadPage}
          class="rounded-md border border-tertiary-black-3 px-3 py-1.5 text-tertiary-black-2 hover:bg-tertiary-black-4 hover:bg-opacity-30 transition-colors"
          style="font-size: var(--font-size-sm);"
        >
          Reload page
        </button>
      </div>
    </div>
  </div>
</div>
