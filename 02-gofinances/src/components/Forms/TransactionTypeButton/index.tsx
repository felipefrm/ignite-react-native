import { TouchableOpacityProps } from "react-native";
import { Container, Title, Icon } from "./styles";

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: 'income' | 'outcome';
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container
      isActive={isActive}
      type={type}
      {...rest}
    >
      <Icon
        name={icons[type]}
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}