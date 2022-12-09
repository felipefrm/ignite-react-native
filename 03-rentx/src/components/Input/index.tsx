import { useTheme } from "styled-components"
import { Feather } from "@expo/vector-icons";

import { Container, IconContainer, InputText } from "./styles"
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ icon, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>

        <Feather
          name={icon}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText {...rest} />
    </Container>
  )
}