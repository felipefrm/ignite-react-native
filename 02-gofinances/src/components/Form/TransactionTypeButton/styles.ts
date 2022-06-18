import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';
import Color from 'color';

interface IconProps {
  type: 'income' | 'outcome';
}

interface ContainerProps {
  isActive: boolean;
  type: 'income' | 'outcome';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 49%;

  padding: 16px 36px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({theme, isActive, type}) => 
    css`
    background-color: ${
      type === 'income' ?
        Color(theme.colors.success).alpha(isActive ? 0.1 : 0).string() :
        Color(theme.colors.attention).alpha(isActive ? 0.1 : 0).string()
    };
    border-color: ${Color(theme.colors.text).alpha(isActive ? 0 : 0.2).string()};
    `
  }
`

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({theme, type}) => 
    type === 'income' ? theme.colors.success : theme.colors.attention
}
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`