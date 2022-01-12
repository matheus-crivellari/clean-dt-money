import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCreateTransactionHttpClient } from "../data/http/createTransactionHttpClient";
import { useListTransactionHttpClient } from "../data/http/listTransactionHttpClient";
import { TransactionModel } from "../data/models/transactionModel";
import { TransactionEntity } from "../domain/entities/transactionEntity";
import { ICreateTransactionUseCase, useCreateTransactionUseCase } from "../domain/usecases/createTransactionUseCase";
import { IListTransactionUseCase, useListTransactionsUseCase } from "../domain/usecases/listTransactionsUseCase";
import { useCreateTransactionHttpRequest } from "../infra/http/createTransactionHttpRequest";
import { useListTransactionHttpRequest } from "../infra/http/listTransactionHttpRequest";

interface ITransactionHook extends IListTransactionUseCase, ICreateTransactionUseCase {}

function useTransactionFactory(): ITransactionHook {
    const listTarnsactionsRequest = useListTransactionHttpRequest(); // <- camada de infra
    const listTransactionsHttp = useListTransactionHttpClient(listTarnsactionsRequest); // <- camada de dados
    const listTransacionsUseCase = useListTransactionsUseCase(listTransactionsHttp); // <- camada de caso de uso

    const createTarnsactionsRequest = useCreateTransactionHttpRequest(); // <- camada de infra
    const createTransactionsHttp = useCreateTransactionHttpClient(createTarnsactionsRequest); // <- camada de dados
    const createTransacionsUseCase = useCreateTransactionUseCase(createTransactionsHttp); // <- camada de caso de uso

    return {
        listTransactions: async () => listTransacionsUseCase.listTransactions(),
        createTransaction: async (transactionModel: TransactionModel) => createTransacionsUseCase.createTransaction(transactionModel),
    };
}

interface TransactionContextData {
    transactions: TransactionEntity[];
    createTransaction(transactionModel: TransactionModel): Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const { createTransaction, listTransactions } = useTransactionFactory();
    const [transactions, setTransactions] = useState<TransactionEntity[]>([])

    async function handleCreateTransaction(transactionModel: TransactionModel) {
        const transaction = await createTransaction(transactionModel);

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    useEffect(() => {
        listTransactions().then(transactions => {
            setTransactions(transactions);
        });
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction: handleCreateTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    return useContext(TransactionsContext);
}