import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { convertToCurrency } from "../../utils/convertToCurrency";

import { Container, Content } from "./styles";

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
  total: string;
  color: string;
}

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  async function loadData() {
    const dataKey = '@gofinances:transactions'

    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const outcomes = transactions
      .filter((transaction: TransactionProps) => transaction.type === 'outcome')

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
          total: convertToCurrency(categorySum)
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Header title="Resumo por categoria" />

      <Content>
        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
     
    </Container>
  )
}