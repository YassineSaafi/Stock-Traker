export interface Inventory {
    productName: string;
    SKU: string;
    category: string | undefined;
    quantity: number;
    unitPrice: number;
    receptionDate: Date;
    lastUpdate: Date;
    status: string;
}
