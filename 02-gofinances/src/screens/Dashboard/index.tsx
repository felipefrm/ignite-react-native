import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

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
  const [transactions, setTransactions] = useState<TransactionListProps[]>([])

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'

    const response = await AsyncStorage.getItem(dataKey)
    const data = response ? JSON.parse(response) : [];

    const dataFormatted: TransactionListProps[] = data
      .map((transaction: TransactionListProps) => {
        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date))

        return {
          ...transaction,
          amount,
          date
        }
      })

    setTransactions(dataFormatted)
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

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
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />


      </Transactions>
    </Container>
  )
}