import type { ImageType } from "./imageType";

export interface ColumnPageType {
  type_de_page: "Style Compétences et prestations";
  texte_haut_de_page: string;
  image_haut_de_page: ImageType;
  colonne: {
    image_normal: ImageType;
    image_webp: ImageType;
    titre: string;
    texte: string;
  }[];
}
