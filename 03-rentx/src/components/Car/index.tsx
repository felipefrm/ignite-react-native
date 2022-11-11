import { TouchableOpacityProps } from "react-native";

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  Thumbnail
} from "./styles";

import GasolineSvg from '../../assets/gasoline.svg';

interface CarProps extends TouchableOpacityProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: CarProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest} >
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>

        </About>
      </Details>

      <Thumbnail source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  )
}