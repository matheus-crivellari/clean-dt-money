import { TransactionEntity } from "../../domain/entities/transactionEntity";
import { IListTransactionHttpClient } from "../../domain/usecases/listTransactionsUseCase";

interface HttpResponse<B = any> {
    body: B;
}

// definicao do contrato da camada de infra, sera usado pela camada de infra
export interface IListTransactionHttpRequest {
    request: () => Promise<HttpResponse<TransactionEntity[]>>,
}

// implementacao da camada de dados, depende do contrato (interface) da camada de infra
export function useListTransactionHttpClient(request: IListTransactionHttpRequest): IListTransactionHttpClient {
    return {
        listTransactions: async () => {
            const response = await request.request();
            return response.body;
        }
    }
}