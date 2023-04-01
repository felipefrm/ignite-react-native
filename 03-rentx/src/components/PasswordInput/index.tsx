import { useState } from "react";
import { TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components"
import { Feather } from "@expo/vector-icons";

import { Container, IconContainer, InputText } from "./styles"

interface PasswordInputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ icon, value, ...rest }: PasswordInputProps) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  function hadnlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible);
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
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />

      <TouchableOpacity onPress={hadnlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </TouchableOpacity>
    </Container>
  )
}