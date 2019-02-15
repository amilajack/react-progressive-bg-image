/* eslint consistent-return: 0 */
// @flow

const isCached = test => test.complete || test.width + test.height > 0;

export type LoadImage = (
  src: string,
) => Promise<{ src: string, isCached: boolean }>;

const loadImage: LoadImage = src =>
  new Promise((resolve, reject) => {
    // On server side, skip this step because Image is not defined on server
    if (typeof window === 'undefined') {
      return resolve({ src, isCached: false });
    }

    const image = new window.Image();
    image.src = src;
    // Remind: Check if cached
    if (isCached(image)) return resolve({ src, isCached: true });

    image.onload = () => resolve({ src, isCached: false });
    image.onerror = err => reject(err);
  });

export default loadImage;
