import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../services/api';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContext {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionsContext = createContext({} as ITransactionsContext);

export function TransactionsProvider({children}: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function createTransaction(transactionInput: ITransactionInput) {
    const response =  await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions(prevState => [...prevState, transaction]);
  }
  
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const contextData = useContext(TransactionsContext);
  return contextData;
}