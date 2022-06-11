import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'

import {
  Container,
  Header,
  Icon,
  Photo,
  User,
  UserGreetings,
  UserInfo,
  UserName,
  UserWrapper,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

export interface TransactionListProps extends TransactionProps {
  id: string;
}

export function Dashboard() {
  const data: TransactionListProps[] = [
    {
      id: '1',
      type: 'income',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "06/12/2020"
    },
    {
      id: '2',
      type: 'outcome',
      title: "Hamburguer Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee"
      },
      date: "13/12/2020"
    },
    {
      id: '3',
      type: 'outcome',
      title: "Aluguel",
      amount: "R$ 1.000,00",
      category: {
        name: "Casa",
        icon: "shopping-bag"
      },
      date: "31/12/2020"
    },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/felipefrm.png' }} />
            <User>
              <UserGreetings>Olá, </UserGreetings>
              <UserName>Felipe</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction='Última entrada dia 09 de junho'
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount="R$ 7.100,00"
          lastTransaction='Última saída dia 09 de junho'
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 10.300,00"
          lastTransaction='Última entrada dia 1 a 16 de junho'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />


      </Transactions>
    </Container>
  )
}