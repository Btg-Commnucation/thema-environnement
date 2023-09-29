export function imageFormatter(
  image: { webP: string; old: string },
  supported: {} | boolean
): string {
  return supported ? image.webP : image.old;
}
