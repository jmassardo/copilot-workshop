import { v4 as uuidv4 } from "uuid";
import { ApiResponse, ApiMeta, PaginationMeta } from "../types";

/**
 * Build a standard API response envelope.
 */
export function buildResponse<T>(
  data: T | null,
  error: string | null = null,
  pagination?: PaginationMeta
): ApiResponse<T> {
  const meta: ApiMeta = {
    timestamp: new Date().toISOString(),
    requestId: uuidv4(),
  };

  if (pagination) {
    meta.pagination = pagination;
  }

  return { data, error, meta };
}

/**
 * Calculate pagination metadata from total count and current page/size.
 */
export function calculatePagination(
  page: number,
  pageSize: number,
  totalItems: number
): PaginationMeta {
  return {
    page,
    pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
  };
}

/**
 * Validate that a string is a positive integer (for URL params like :id).
 */
export function isValidId(value: string): boolean {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}
