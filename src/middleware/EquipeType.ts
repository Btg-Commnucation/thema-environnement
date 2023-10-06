import type { LinkType } from "./LinkType";
import type { ImageType } from "./imageType";

export interface EquipeType {
  type_de_page: "Style équipe";
  titre_equipe: string;
  membre: {
    image: ImageType;
    image_webp: ImageType;
    nom: string;
    poste: string;
  }[];
  organigramme: {
    nombre: string;
    texte: string;
  }[];
  agences: {
    titre_agence: string;
    siege_social: string;
    texte: string;
  }[];
  texte_sous_organigramme_agence: string;
  bouton: LinkType;
  titre_equipe_poly: string;
  texte_equie_poly: string;
  gallerie_dimage: {
    image: ImageType;
    image_webp: ImageType;
  }[];
}
