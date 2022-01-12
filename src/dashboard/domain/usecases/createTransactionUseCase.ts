import { TransactionEntity } from "../entities/transactionEntity";

type TransactionModel = Omit<TransactionEntity, 'id' | 'createdAt'>;

// definicao do contrato da camdada de dados, sera usado pela camada de dados
export interface ICreateTransactionHttpClient {
    createTransacion: (transactionModel: TransactionModel) => Promise<TransactionEntity>;
}

// definicao do contrato do caso de uso, sera usado pela camada de apresentacao
export interface ICreateTransactionUseCase {
    createTransaction: (transactionModel: TransactionModel) => Promise<TransactionEntity>;
}

// implementacao do caso de uso, depende do contrato (interface) da camada de dados
export function useCreateTransactionUseCase(http: ICreateTransactionHttpClient): ICreateTransactionUseCase {
    return {
        createTransaction: (transactionModel: TransactionModel) => http.createTransacion(transactionModel),
    }
}