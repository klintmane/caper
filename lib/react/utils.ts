import { useEffect } from "react";

export const useEvent = (e: string, fn: EventListenerOrEventListenerObject, target: EventTarget = document) =>
  useEffect(() => {
    target?.addEventListener(e, fn);
    return () => {
      target?.removeEventListener(e, fn);
    };
  }, [e, fn, target]);
