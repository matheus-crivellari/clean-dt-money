export type TransactionType = 'deposit' | 'withdraw';

export interface TransactionEntity {
    id: number;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    createdAt: string;
};