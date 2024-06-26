import { debounce } from "@src/shared/utils";
import { useEffect, useMemo } from "react";

export default function useDebounce<A = unknown[], R = void>(
  fn: (args: A) => R,
  ms: number,
) {
  const [debouncedFn, tearDown] = useMemo(() => debounce(fn, ms), [fn, ms]);

  useEffect(() => () => tearDown(), [tearDown]);

  return debouncedFn;
}
