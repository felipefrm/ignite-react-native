import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  disabled = false,
  loading = false
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      color={color ?? theme.colors.main}
      onPress={onPress}
      disabled={disabled}
      style={{ opacity: (disabled || loading) ? 0.5 : 1 }}
    >
      {
        loading
          ? <ActivityIndicator color={theme.colors.shape} />
          : <Title>{title}</Title>
      }
    </Container>
  )
}