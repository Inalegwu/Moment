import { useEffect } from "react";

export default function useInterval(fn: () => unknown, ms = 3000) {
  useEffect(() => {
    const t = setInterval(fn, ms);

    return () => clearInterval(t);
  }, [fn, ms]);
}
