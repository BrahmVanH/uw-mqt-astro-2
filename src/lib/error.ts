import * as Sentry from "@sentry/astro";
import placeholderImg from "@/image/placeholder.svg";
import type { AstroGlobal, ImageMetadata } from "astro";


/**
 * Different types of errors that might be found across the app
 * @enum ErrorCode
 */

export enum ErrorCode {
  /** Errors related to external connections (i.e. unable to reach api, no network connection) */
  NETWORK_ERROR = 'NETWORK_ERROR',

  /** Errors thrown during graphql operations */
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',

  /** Errors including those thrown during typechecks and form validation  */
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  /** Errors specific to ALICE programs and images fetched from api  */
  PROGRAM_NOT_FOUND = 'PROGRAM_NOT_FOUND',
  PROGRAM_INVALID = 'PROGRAM_INVALID',
  IMAGE_NOT_FOUND = 'IMAGE_NOT_FOUND',

  /** Authentication, access related errors */
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  /** Unexpected errors */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Base error class for application-specific errors
 * Extends standard Error with additional properties for error categorization and handling
 *
 * Features:
 * - Error code classification via ErrorCode enum
 * - Contextual information for debugging and error reporting
 * - Structured error chains via the cause property
 * - Retryability flag to indicate if the operation can be retried
 * - JSON serialization for error logging and API responses
 *
 * @param options Configuration object for the error
 * @param options.message Human-readable description of the error
 * @param options.code Error classification code from ErrorCode enum (defaults to UNKNOWN_ERROR)
 * @param options.cause Original error that triggered this error (for error chaining)
 * @param options.context Additional data relevant to the error (e.g., request params, IDs)
 * @param options.isRetryable Indicates if the operation can be safely retried (defaults to false)
 *
 * @example
 * throw new AppError({
 *   message: 'Failed to load program data',
 *   code: ErrorCode.NETWORK_ERROR,
 *   cause: originalError,
 *   context: { programId: '123', endpoint: '/api/programs' },
 *   isRetryable: true
 * });
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly context?: Record<string, any>;
  public readonly cause?: Error;
  public readonly isRetryable: boolean;

  constructor({
    message,
    code = ErrorCode.UNKNOWN_ERROR,
    cause,
    context = {},
    isRetryable = false,
  }: {
    message: string;
    code?: ErrorCode;
    cause?: Error;
    context?: Record<string, any>;
    isRetryable?: boolean;
  }) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.cause = cause;
    this.context = context;
    this.isRetryable = isRetryable;

    // Maintains proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * Converts an AppError instance to a JSON-serializable object
   * Preserves error hierarchy by recursively serializing nested causes
   * @returns {Record<string, any>} JSON representation of the error
   */
  public toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      stack: this.stack,
      cause: this.cause ? (this.cause instanceof AppError ? this.cause.toJSON() : { message: this.cause.message, stack: this.cause.stack }) : undefined,
    };
  }
}

/**
 * NetworkError represents failures in external API calls or connectivity issues
 * These errors are marked as re-triable by default as they often resolve with time
 */
export class NetworkError extends AppError {
  constructor(message: string, cause?: Error, context?: Record<string, any>) {
    super({
      message,
      code: ErrorCode.NETWORK_ERROR,
      cause,
      context,
      isRetryable: true,
    });
    this.name = 'NetworkError';
  }
}

/**
 * GraphQLError represents issues with GraphQL query execution or validation
 * Captures errors returned by the GraphQL server or client-side parsing failures
 */
export class GraphQLError extends AppError {
  constructor(message: string, cause?: Error, context?: Record<string, any>) {
    super({
      message,
      code: ErrorCode.GRAPHQL_ERROR,
      cause,
      context,
    });
    this.name = 'GraphQLError';
  }
}

/**
 * ProgramNotFoundError indicates a requested program doesn't exist
 * Used when querying for specific program IDs that aren't found in the database
 * @param programId The ID of the program that wasn't found
 * @param cause Optional underlying error that triggered this error
 */
export class ProgramNotFoundError extends AppError {
  constructor(programId: string, cause?: Error) {
    super({
      message: `Program with ID ${programId} not found`,
      code: ErrorCode.PROGRAM_NOT_FOUND,
      cause,
      context: { programId },
    });
    this.name = 'PropertyNotFoundError';
  }
}


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
