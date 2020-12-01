import { useEffect } from "react";
export * as array from "./array";

export const useEvent = (e: string, fn: EventListenerOrEventListenerObject, target: EventTarget = document) =>
  useEffect(() => {
    target?.addEventListener(e, fn);
    return () => {
      target?.removeEventListener(e, fn);
    };
  }, [e, fn, target]);
