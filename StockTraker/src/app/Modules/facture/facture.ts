export interface Facture {
  _id: string;
  num: string;
  client: string;
  adresse?: string;
  produits: {
    idProduit: string;
    ref: string;
    nom: string;
    prix: number;
    qte: number;
  }[];
  somme: number;
  paiement: 'espèces' | 'chèque' | 'virement';
  date: Date;
  validation: boolean;
}
