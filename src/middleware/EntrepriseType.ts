import type { ImageType } from "./imageType";

export interface EntrepriseType {
  type_de_page: "Style entreprise et valeurs";
  image_haut: ImageType;
  image_haut_webp: ImageType;
  titre: string;
  frise: FriseType[];
  texte_fond_jaune: string;
  contenu: string;
  titre_colonne: string;
  triple_colonnes: ColonneType[];
  texte_fond_jaune_bas: string;
  image_fond_jaune_bas: ImageType;
  image_fond_jaune_bas_webp: ImageType;
}

export interface FriseType {
  image: ImageType;
  image_webp: ImageType;
  titre: string;
  texte: string;
}

interface ColonneType {
  image: ImageType;
  image_webp: ImageType;
  texte: string;
}
