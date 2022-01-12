import { TransactionEntity } from "../../domain/entities/transactionEntity";
import { ICreateTransactionHttpClient } from "../../domain/usecases/createTransactionUseCase";
import { TransactionModel } from "../models/transactionModel";

interface HttpResponse<B = any> {
    body: B;
}

// definicao do contrato da camada de infra, sera usado pela camada de infra
export interface ICreateTransactionHttpRequest {
    request: (transactionModel: TransactionModel) => Promise<HttpResponse<TransactionEntity>>,
}

// implementacao da camada de dados, depende do contrato (interface) da camada de infra
export function useCreateTransactionHttpClient(request: ICreateTransactionHttpRequest): ICreateTransactionHttpClient {
    return {
        createTransacion: async (transactionModel) => {
            const response = await request.request(transactionModel);
            return response.body;
        }
    };
}