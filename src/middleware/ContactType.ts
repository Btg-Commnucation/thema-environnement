export interface ContactType {
  type_de_page: "Contact";
  position_agence: {
    avec_pin: string;
    titre: string;
    siege_social: string;
    texte: string;
  }[];
}
