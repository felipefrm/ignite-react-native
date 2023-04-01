import { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components"
import { Feather } from "@expo/vector-icons";

import { Container, IconContainer, InputText } from "./styles"

interface InputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ icon, value, ...rest }: InputProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>

        <Feather
          name={icon}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  )
}