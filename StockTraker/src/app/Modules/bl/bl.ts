export interface BonDeLivraison {
        _id: string;
        num: string;
        client: string;
        produits: any[];
        somme: number;
        date: Date;
        livreur?:string;
        adresse?: string; 
      }
      