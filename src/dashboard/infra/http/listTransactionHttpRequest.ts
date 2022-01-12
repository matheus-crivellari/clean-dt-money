import axios, { AxiosResponse } from 'axios';

import { IListTransactionHttpRequest } from "../../data/http/listTransactionHttpClient";
import { TransactionEntity } from '../../domain/entities/transactionEntity';

interface TransactionsResponse {
    transactions: TransactionEntity[];
}

// implementacao da camada de infra, depende do contrato (interface da camdada de dados)
export function useListTransactionHttpRequest(): IListTransactionHttpRequest {
    const api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    });

    return {
        request: async () => {
            const response: AxiosResponse<TransactionsResponse> = await api.get('transactions');

            return {
                body: response?.data?.transactions,
            };
        }
    }
}