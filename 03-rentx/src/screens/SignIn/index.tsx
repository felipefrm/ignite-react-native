import { useState } from "react";
import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from 'yup';

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import theme from "../../styles/theme";
import { Footer, Container, Header, SubTitle, Title, Form } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup
          .string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup
          .string()
          .required('A senha é obrigatória')
      });

      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um ero ao fazer login, verifique as credencoais'
        )
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              icon="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              disabled
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              // disabled
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}