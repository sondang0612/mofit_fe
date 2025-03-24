import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ParamItem {
  key: string;
  value: string | number | boolean | null;
}

/**
 * Enhanced hook for managing URL search parameters
 *
 * Features:
 * - Add/update multiple parameters at once
 * - Remove parameters by setting value to null
 * - Support for strings, numbers, and booleans
 * - Preserve existing parameters by default
 * - Option to replace all parameters
 * - Batch parameter updates
 * - Debounce option for rapid changes
 */
export const useUrlParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Set URL parameters
   * @param data Array of parameter key-value pairs
   * @param options Configuration options
   */
  const setParams = useCallback(
    (
      data: ParamItem[],
      options: {
        replace?: boolean;
        scroll?: boolean;
        debounce?: number;
      } = {}
    ) => {
      const { replace = false, scroll = false, debounce = 0 } = options;

      // Use timeout for debouncing
      const timeoutId = setTimeout(() => {
        // Create new params or start with existing ones
        const params = replace
          ? new URLSearchParams()
          : new URLSearchParams(searchParams.toString());

        // Process each parameter
        data.forEach((item) => {
          const { key, value } = item;

          // Remove parameter if value is null
          if (value === null) {
            params.delete(key);
          }
          // Handle different value types
          else {
            // Convert boolean or number to string
            const stringValue =
              typeof value === "boolean" || typeof value === "number"
                ? value.toString()
                : value;

            params.set(key, stringValue);
          }
        });

        // Construct the new URL
        const newUrl = params.toString() ? `?${params.toString()}` : "";

        // Navigate to the new URL
        router.push(newUrl, { scroll });
      }, debounce);

      // Return a cleanup function to cancel debounced navigation if component unmounts
      return () => clearTimeout(timeoutId);
    },
    [searchParams, router]
  );

  /**
   * Remove specific parameters from the URL
   * @param keys Array of parameter keys to remove
   * @param options Configuration options
   */
  const removeParams = useCallback(
    (paramItems: ParamItem[], options: { scroll?: boolean } = {}) => {
      const { scroll = false } = options;
      const params = new URLSearchParams(searchParams.toString());

      paramItems.forEach((item) => params.delete(item.key, `${item.value}`));

      router.push(params.toString() ? `?${params.toString()}` : "", { scroll });
    },
    [searchParams, router]
  );

  /**
   * Clear all parameters from the URL
   * @param options Configuration options
   */
  const clearParams = useCallback(
    (options: { scroll?: boolean } = {}) => {
      const { scroll = false } = options;
      router.push("", { scroll });
    },
    [router]
  );

  /**
   * Get the current value of a parameter
   * @param key Parameter key
   * @returns The parameter value or null if not present
   */
  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  /**
   * Get the current value of a parameter
   * @param key Parameter key
   * @returns The parameter value or null if not present
   */
  const getAllParams = useCallback(
    (key: string) => {
      return searchParams.getAll(key);
    },
    [searchParams]
  );

  /**
   * Check if a parameter exists
   * @param key Parameter key
   * @returns Boolean indicating if the parameter exists
   */
  const hasParam = useCallback(
    (key: string) => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  /**
   * Toggle a value in an array parameter
   * @param key Parameter key
   * @param value Value to toggle
   * @param options Configuration options
   */
  const toggleArrayParam = useCallback(
    (
      key: string,
      value: string,
      options: { scroll?: boolean; shouldReset?: boolean } = {}
    ) => {
      const { scroll = false } = options;
      const params = new URLSearchParams(searchParams.toString());

      // Get all values for the key
      let values = params.getAll(key);

      // Toggle the value (remove if exists, add if doesn't)
      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }

      // Remove all occurrences of the key
      params.delete(key);

      // Add back all values
      values.forEach((v) => params.append(key, v));

      // Update the URL
      if (options.shouldReset) {
        params.set("page", "1");
      }
      router.push(`?${params.toString()}`, { scroll });
    },
    [searchParams, router]
  );

  return {
    setParams,
    removeParams,
    clearParams,
    getParam,
    hasParam,
    toggleArrayParam,
    params: searchParams,
    getAllParams,
  };
};
