import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../hooks/auth";
import { categories } from "../../utils/categories";
import { convertToCurrency } from "../../utils/convertToCurrency";

import {
  Container,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month
} from "./styles";

export interface TransactionProps {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const theme = useTheme()

  function handleDateChange(action: 'prev' | 'next') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(true)

    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const outcomes = transactions
      .filter((transaction: TransactionProps) =>
        transaction.type === 'outcome' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
      )

    const totalOutcome = outcomes.reduce((acc: number, outcome: TransactionProps) => {
      return acc + Number(outcome.amount);
    }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      outcomes.forEach((outcome: TransactionProps) => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount)
        }
      })

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: convertToCurrency(categorySum),
          percent: (categorySum / totalOutcome * 100).toFixed(0) + "%"
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      <Header title="Resumo por categoria" />
      {
        isLoading ? <Loading /> : (
          <>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent"
                y="total"
                colorScale={totalByCategories.map(category => category.color)}
                labelRadius={50}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  }
                }}
              />
            </ChartContainer>

            <Content>
              {
                totalByCategories.map(item => (
                  <HistoryCard
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                  />
                ))
              }
            </Content>
          </>
        )
      }
    </Container>
  )
}