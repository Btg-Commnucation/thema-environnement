import type { ImageType } from "./imageType";

export interface DomaineType {
  type_de_page: "Style domaines d'intervention";
  image_haut: ImageType;
  image_haut_webp?: ImageType;
  titre_fond_vert: string;
  column_fond_vert: DomaineTypeProps[];
  texte_fond_vert: string;
  titre_fond_jaune: string;
  column_fond_jaune: DomaineTypeProps[];
  texte_fond_jaune: string;
  titre_fond_blanc: string;
  column_fond_blanc: DomaineTypeProps[];
  texte_fond_blanc: string;
}

interface DomaineTypeProps {
  image: ImageType;
  image_webp: ImageType;
  texte: string;
}
