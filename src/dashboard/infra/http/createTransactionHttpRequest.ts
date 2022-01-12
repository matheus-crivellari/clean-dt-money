import axios, { AxiosResponse } from 'axios';
import { ICreateTransactionHttpRequest } from '../../data/http/createTransactionHttpClient';

import { TransactionEntity } from '../../domain/entities/transactionEntity';

type  TransactionResponse = {
    transaction: TransactionEntity;
};

// implementacao da camada de infra, depende do contrato (interface da camdada de dados)
export function useCreateTransactionHttpRequest(): ICreateTransactionHttpRequest {
    const api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    });

    return {
        request: async (transactionModel) => {
            const response: AxiosResponse<TransactionResponse> = await api
                .post('transactions', transactionModel);

            return {
                body: response?.data?.transaction,
            };
        }
    }
}