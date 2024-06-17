// Interface BonReception dans Angular
export interface BonReception {
    _id?: string; // Optionnel si vous utilisez MongoDB et souhaitez gérer l'ID
    reference: string;
    fournisseur: string; // Cela peut être l'ID du fournisseur ou l'objet complet si nécessaire
    produits: { 
      produit: string; // Cela peut être l'ID du produit ou l'objet complet si nécessaire
      quantite: number;
    }[];
    dateReception?: Date; // Optionnel si vous voulez gérer la date de réception
    createdAt?: Date; // Optionnel si vous voulez gérer la date de création
    updatedAt?: Date; // Optionnel si vous voulez gérer la date de mise à jour
  }
  