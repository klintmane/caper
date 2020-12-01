export const left = <T>(arr: Array<T>, i: number) => (i <= 0 ? [] : arr.slice(0, i));

export const right = <T>(arr: Array<T>, i: number) => (i >= arr.length - 1 ? [] : arr.slice(i + 1));

export const remove = <T>(arr: Array<T>, i: number) => left(arr, i).concat(right(arr, i));

export const replace = <T>(arr: Array<T>, i: number, val: T) => left(arr, i).concat([val], right(arr, i));

// get: convert entry to be processed from x -> array
// set: convert processed entry from array -> x

export const removeAtPath = <T>(arr: Array<T>, path: number[], get: (a: T) => any = id, set: (a: T, b: T) => any = id): any => {
  const [i, ...rest] = path;
  return rest.length ? replace(arr, i, set(removeAtPath(get(arr[i]), rest, get, set), arr[i])) : remove(arr, i);
};

const id = <T>(x: T) => x;
