import { useState } from "react";
import ReactModal from "react-modal";
import { Header } from "./core/presentation/components/Header";
import { GlobalStyle } from "./core/styles/global";
import { TransactionsProvider } from "./dashboard/hooks/useTransactions";
import { NewTransactionModal } from "./dashboard/presentation/components/NewTransactionModal";
import { Dashboard } from "./dashboard/presentation/pages/Dashboard";

ReactModal.setAppElement('#root');

function App() {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    return (
        <TransactionsProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <Dashboard />
            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />
            <GlobalStyle />
        </TransactionsProvider>
    );
}

export default App;
