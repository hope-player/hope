export function wrapInPromise(fn) {
  return new Promise((resolve, reject) => {
    try {
      fn();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
