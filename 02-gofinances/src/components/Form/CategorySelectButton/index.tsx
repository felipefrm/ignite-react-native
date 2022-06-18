import { TouchableOpacityProps } from "react-native";
import { Container, Category, Icon } from "./styles";

interface CategorySelectProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}