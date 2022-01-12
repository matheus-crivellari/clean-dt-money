import { TransactionEntity } from "../../domain/entities/transactionEntity";

export type TransactionModel = Omit<TransactionEntity, 'id' | 'createdAt'>