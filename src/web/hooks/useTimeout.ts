import { useEffect } from "react";

export default function useTimeout(cb: () => void, duration = 3000) {
  useEffect(() => {
    const t = setTimeout(cb, duration);

    return () => {
      clearTimeout(t);
    };
  }, [cb, duration]);
}
