import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { useForm } from "react-hook-form";
import { useNavigation, NavigationProp, ParamListBase, } from "@react-navigation/native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from "./styles";

interface FormData {
  [key: string]: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório'),
})

export function Register() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false)
  }

  async function onSubmit(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      ...form,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = '@gofinances:transactions'

      const data = await AsyncStorage.getItem(dataKey)
      const formattedData = data ? JSON.parse(data) : []

      formattedData.push(newTransaction)

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData))

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })

      navigate('Listagem')

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar a transação.")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              placeholder="Nome"
              control={control}
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputForm
              name="amount"
              placeholder="Valor"
              control={control}
              keyboardType="numeric"
              error={errors.amount?.message}
            />

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

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}