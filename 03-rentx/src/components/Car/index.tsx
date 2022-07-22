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

interface CarProps {
  data: CarData;
}

export function Car({ data }: CarProps) {
  return (
    <Container>
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