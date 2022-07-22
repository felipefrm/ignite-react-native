import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} heigth={RFValue(12)} />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  )
}