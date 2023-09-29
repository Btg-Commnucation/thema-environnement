import { writable } from "svelte/store";

export const webpSupported = writable(false);

export function checkWebpSupport() {
  const img = new Image();
  img.onload = () => {
    webpSupported.set(img.width > 0 && img.height > 0);
  };
  img.onerror = () => {
    webpSupported.set(false);
  };
  img.src =
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
}
