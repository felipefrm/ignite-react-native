import {
  Amount,
  Body,
  Container,
  Header,
  Icon,
  LastTransaction,
  Title
} from "./styles";

interface HighlightCardProps {
  type: 'income' | 'outcome' | 'total'
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>
          {title}
        </Title>
        <Icon
          name={icon[type]}
          type={type}
        />
      </Header>

      <Body>
        <Amount type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Body>
    </Container>
  )
}