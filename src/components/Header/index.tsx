import logoImg from '../../assets/logo.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { formatAmountToBRL } from '../../util/fomatAmountToBRL';
import { formatDate } from '../../util/formatDate';
import { generateXlsx } from '../../util/generateXlsx';
import { ButtonsContainer, Container, Content } from './styles';

interface IHeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: IHeaderProps) {
  const { transactions } = useTransactions();
  const xlsxData = transactions.map(transaction => {
    const Tipo = transaction.type === 'deposit' ? 'Entrada' : 'Saída';
    return {
      Categoria: transaction.category,
      Título: transaction.title,
      Valor: formatAmountToBRL(transaction.amount),
      Tipo,
      Criação: formatDate(transaction.createdAt),
    }
  });

  const xlsxDataOrderedByType = ((xlsxData) => {
    let i, j;
    const arr = [...xlsxData];
    for (i = 0; i < arr.length; i++) {
      if (arr[i].Tipo === 'Entrada') continue;
      for (j = i + 1; j < arr.length; j++) {
        if (arr[j].Tipo === 'Entrada') {
          const aux = arr[j];
          arr[j] = arr[i];
          arr[i] = aux;
          break;
        }
      }
    }
    return arr;
  })(xlsxData);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <ButtonsContainer>
          <button
            type='button'
            onClick={() =>  generateXlsx({data: xlsxDataOrderedByType})}
          >
            Gerar arquivo XLSX
          </button>
          
          <button 
            type='button'
            onClick={onOpenNewTransactionModal}  
          >
            Nova transação
          </button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
}