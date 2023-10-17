import slugify from "slugify";
import { onDestroy } from "svelte";
import { get, writable } from "svelte/store";

export const showMenu = writable(false);
export const showSubMenu = writable(false);

let unsubscribe: () => void;

export function toggleMenu(subMenu: Element | null) {
  unsubscribe = showSubMenu.subscribe((value) => {
    if (value) {
      subMenu?.classList.add("active");
    } else {
      subMenu?.classList.remove("active");
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
}

export const slugTitle = (title: string) => {
  let titleSlugify = slugify(title, {
    replacement: "-",
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
  return titleSlugify;
};
