import type { LinkType } from "./LinkType";

export interface RecrutementType {
  type_de_page: "Style recrutement";
  recurement_on__off: string;
  texte_recrutement_off: string;
  liste_de_postes: {
    poste: string;
    lien_de_telechargement: LinkType;
  }[];
}
