import { useTheme } from "styled-components"
import { Feather } from "@expo/vector-icons";

import { Container, IconContainer, InputText } from "./styles"
import { TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

interface PasswordInputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ icon, ...rest }: PasswordInputProps) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  function hadnlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      <IconContainer>

        <Feather
          name={icon}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />

      <TouchableOpacity onPress={hadnlePasswordVisibilityChange}>
        <IconContainer>
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