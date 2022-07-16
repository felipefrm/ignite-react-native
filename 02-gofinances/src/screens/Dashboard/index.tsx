import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { HighlightCard } from '../../components/HighlightCard'
import { Loading } from '../../components/Loading';
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'

import { useAuth } from '../../hooks/auth';
import { convertToCurrency } from '../../utils/convertToCurrency';

import {
  Container,
  Header,
  Icon,
  Photo,
  User,
  LogoutButton,
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

  const { user, signOut } = useAuth();

  function getLastTransactionDate(transactions: TransactionListProps[], type: 'income' | 'outcome') {
    const lastTransaction = new Date(Math.max(
      ...transactions
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
    ));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`

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

    const lastIncomeTransaction = getLastTransactionDate(dataFormatted, 'income')
    const lastOutcomeTransaction = getLastTransactionDate(dataFormatted, 'outcome')
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
                  <Photo source={{ uri: user.photo }} />
                  <User>
                    <UserGreetings>Olá, </UserGreetings>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>
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