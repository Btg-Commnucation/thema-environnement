export interface MenuState {
  data: MenuElement[];
}

export interface MenuElement {
  ID: number;
  menu_order: number;
  title: string;
  url: string;
  slug: string;
  target: string;
  description: string;
  menu_item_parent: string;
}
