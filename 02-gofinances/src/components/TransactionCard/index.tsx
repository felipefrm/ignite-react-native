import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from "./styles";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionProps {
  type: 'income' | 'outcome';
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface TransactionCardProps {
  transaction: TransactionProps;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Container>
      <Title>{transaction.title}</Title>

      <Amount type={transaction.type}>
        {transaction.type === 'outcome' && '- '}{transaction.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={transaction.category.icon} />
          <CategoryName>{transaction.category.name}</CategoryName>
        </Category>

        <Date>{transaction.date}</Date>
      </Footer>

    </Container>
  )
}