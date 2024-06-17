export interface ChequeInterface {
    _id?: string;
    numboedereau: string;
    client: string;
    date: Date;
    copie?: string; 
    banque: string;
    montant: number;
    etat: 'versé' | 'nonversé';
}
