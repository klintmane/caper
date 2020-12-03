// @ts-ignore
const beforeInputSupported = typeof InputEvent.prototype.getTargetRanges === "function";

// TODO: Wrap in a useCallback for perf reasons
export const beforeInputPolyfill = <E extends Event>(getter: (e: E) => string) =>
  beforeInputSupported
    ? undefined
    : (e: E) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget?.dispatchEvent(new InputEvent("beforeinput", { bubbles: true, cancelable: true, data: getter(e) }));
      };

// TODO: Wrap in a useCallback/useMemo for perf reasons
export const beforeInputEnabled = <T, V>(y: T, n: V) => (beforeInputSupported ? y : n);
