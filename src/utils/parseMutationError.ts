import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function parseMutationError(err: unknown): string {
  if (!err) return "Unknown error";

  if (typeof err === "object") {
    const e = err as FetchBaseQueryError & { message?: string };
    if (e.data && typeof e.data === "object" && "message" in e.data) {
      return (e.data as { message: string }).message;
    } else if (typeof e.data === "string") {
      return e.data;
    } else if ("message" in e) {
      return e.message!;
    }
  }

  return "An error occurred";
}
