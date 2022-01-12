import { TransactionEntity } from "../entities/transactionEntity";

// definiicao do contrato da camada de dados, sera usado pela camada de dados
export interface IListTransactionHttpClient {
    listTransactions: () => Promise<TransactionEntity[]>;
}

// definicao do contrato do caso de uso, sera usado pela camada de apresentacao
export interface IListTransactionUseCase {
    listTransactions: () => Promise<TransactionEntity[]>;
}

// implementacao do caso de uso, depende do contrato (interface) da camada de dados
export function useListTransactionsUseCase(http: IListTransactionHttpClient): IListTransactionUseCase {
    return {
        listTransactions: () => http.listTransactions(),
    }
}