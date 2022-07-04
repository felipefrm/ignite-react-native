import { categories } from "../../utils/categories";
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

export interface TransactionProps {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  transaction: TransactionProps;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const [category] = categories.filter(item => item.key === transaction.category)

  return (
    <Container>
      <Title>{transaction.name}</Title>

      <Amount type={transaction.type}>
        {transaction.type === 'outcome' && '- '}{transaction.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{transaction.date}</Date>
      </Footer>

    </Container>
  )
}