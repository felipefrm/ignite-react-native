import { Amount, Body, Container, Header, Icon, LastTransaction, Title } from "./styles";

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Body>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>Última entrada dia 09 de junho</LastTransaction>
      </Body>
    </Container>
  )
}