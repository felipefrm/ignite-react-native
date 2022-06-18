import { useState } from "react";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              type="income"
              title="Entrada"
              isActive={transactionType === 'income'}
              onPress={() => handleTransactionTypeSelect('income')}
            />
            <TransactionTypeButton
              type="outcome"
              title="Saída"
              isActive={transactionType === 'outcome'}
              onPress={() => handleTransactionTypeSelect('outcome')}
            />
          </TransactionTypes>

          <CategorySelectButton title="Categoria" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  )
}