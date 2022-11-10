import { TouchableOpacityProps } from "react-native";

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

interface CarData {
  brand: string;
  name: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  }
}

interface CarProps extends TouchableOpacityProps {
  data: CarData;
}

export function Car({ data, ...rest }: CarProps) {
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
            <GasolineSvg />
          </Type>

        </About>
      </Details>

      <Thumbnail source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  )
}