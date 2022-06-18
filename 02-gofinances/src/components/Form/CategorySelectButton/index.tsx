import { Container, Category, Icon } from "./styles";

interface CategorySelectProps {
  title: string
}

export function CategorySelectButton({title}: CategorySelectProps) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}