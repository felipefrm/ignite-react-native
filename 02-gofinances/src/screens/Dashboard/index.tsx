import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'
import { convertToCurrency } from '../../utils/convertToCurrency';

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

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  outcome: HighlightProps,
  income: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'

    const response = await AsyncStorage.getItem(dataKey)
    const data = response ? JSON.parse(response) : [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    const dataFormatted: TransactionListProps[] = data
      .map((transaction: TransactionListProps) => {

        if (transaction.type === 'income') {
          incomeTotal += Number(transaction.amount)
        } else {
          outcomeTotal += Number(transaction.amount)
        }

        const amount = convertToCurrency(transaction.amount)

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

    setHighlightData({
      income: {
        amount: convertToCurrency(incomeTotal)
      },
      outcome: {
        amount: convertToCurrency(outcomeTotal)
      },
      total: {
        amount: convertToCurrency(incomeTotal - outcomeTotal)
      }
    })
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
          amount={highlightData.income.amount}
          lastTransaction='Última entrada dia 09 de junho'
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount={highlightData.outcome.amount}
          lastTransaction='Última saída dia 09 de junho'
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
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