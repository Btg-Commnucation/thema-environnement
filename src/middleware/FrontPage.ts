import type { LinkType } from "./LinkType";
import type { ImageType } from "./imageType";

export interface FrontPage {
  id: number;
  title: string;
  slug: string;
  permalink: string;
  content: string;
  acf: {
    image_haut_de_page: ImageType;
    image_haut_de_page_webp: ImageType;
    texte_fond_jaune: string;
    titre_un: string;
    contenu: string;
    titre_deux: string;
    prestations_un: Prestations[];
    prestations_deux: Prestations[];
    image_fond_vert: ImageType;
    image_fond_vert_webp: ImageType;
    texte_fond_vert: string;
    lien_fond_vert: LinkType;
    titre_un_bas_de_page: string;
    texte_un_bas_de_page: string;
    lien_un_bas_de_page: LinkType;
    carrousel: Carrousel[];
    titre_deux_bas_de_page: string;
    texte_deux_bas_de_page: string;
    image_bas_de_page: ImageType;
    image_bas_de_page_webp: ImageType;
    lien_bas_de_page: LinkType;
  };
  yoast: {
    yoast_wpseo_metadesc: string;
    yoast_wpseo_title: string;
  };
  media:
    | {
        large: string;
        medium: string;
        small: string;
      }
    | boolean;
}

interface Carrousel {
  image: ImageType;
  image_webp: ImageType;
  texte: string;
}

export interface Prestations {
  titre: string;
  image: ImageType;
  image_webp: ImageType;
  texte: string;
  lien: LinkType;
}
