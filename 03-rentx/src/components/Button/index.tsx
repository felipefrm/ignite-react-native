import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  disabled = false,
  loading = false,
  light = false
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
          : <Title light={light}>{title}</Title>
      }
    </Container>
  )
}