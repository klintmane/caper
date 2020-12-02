// @ts-ignore
const beforeInputSupported = typeof InputEvent.prototype.getTargetRanges === "function";

export const beforeInputPolyfill = <E extends Event>(getter: (e: E) => string) =>
  beforeInputSupported
    ? undefined
    : (e: E) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget?.dispatchEvent(new InputEvent("beforeinput", { bubbles: true, cancelable: true, data: getter(e) }));
      };

export const beforeInputEnabled = (x: any) => (beforeInputSupported ? x : undefined);
export const beforeInputDisabled = (x: any) => (!beforeInputSupported ? x : undefined);
