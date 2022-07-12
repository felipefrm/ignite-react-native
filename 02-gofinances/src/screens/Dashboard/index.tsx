import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard'
import { Loading } from '../../components/Loading';
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
  lastTransaction: string;
}

interface HighlightData {
  outcome: HighlightProps,
  income: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme()

  function getLastTransactionDate(type: 'income' | 'outcome') {
    const lastTransaction = new Date(Math.max.apply(
      Math,
      transactions
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
    ));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

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

    const lastIncomeTransaction = getLastTransactionDate('income')
    const lastOutcomeTransaction = getLastTransactionDate('outcome')
    const totalInterval = `01 a ${lastOutcomeTransaction}`

    setHighlightData({
      income: {
        amount: convertToCurrency(incomeTotal),
        lastTransaction: `Última entrada dia ${lastIncomeTransaction}`
      },
      outcome: {
        amount: convertToCurrency(outcomeTotal),
        lastTransaction: `Última saída dia ${lastOutcomeTransaction}`
      },
      total: {
        amount: convertToCurrency(incomeTotal - outcomeTotal),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      {
        isLoading ? <Loading /> : (
          <>
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
                lastTransaction={highlightData.income.lastTransaction}
              />
              <HighlightCard
                type="outcome"
                title="Saídas"
                amount={highlightData.outcome.amount}
                lastTransaction={highlightData.outcome.lastTransaction}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
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
          </>
        )
      }

    </Container>
  )
}