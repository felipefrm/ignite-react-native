import { HighlightCard } from '../../components/HighlightCard'
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
  HighlightCards
} from './styles'

export function Dashboard() {
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
          amount="R$ 17.400,00"
          lastTransaction='Última entrada dia 09 de junho'
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount="R$ 7.100,00"
          lastTransaction='Última saída dia 09 de junho'
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 10.300,00"
          lastTransaction='Última entrada dia 1 a 16 de junho'
        />
      </HighlightCards>
    </Container>
  )
}