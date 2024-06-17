export interface Devis {
  _id: string;
  num: string;
  client: string;
  produits: Array<{
    idProduit: string;
    ref: string;
    nom: string;
    qte: number;
    prix: number;
  }>;
  date: Date;
  somme: number;
}
