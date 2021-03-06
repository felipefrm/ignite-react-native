import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  About,
  Footer
} from "./styles";
import { Button } from "../../components/Button";

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={["data:image/jpeg;base64,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"]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>

            <Brand>AUDI</Brand>
            <Name>RS 5 Coupe</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 560</Price>
          </Rent>

        </Details>

        <Acessories>
          <Acessory name="380Km/h" icon={SpeedSvg} />
          <Acessory name="3.2s" icon={AccelerationSvg} />
          <Acessory name="800 HP" icon={ForceSvg} />
          <Acessory name="Gasolina" icon={GasolineSvg} />
          <Acessory name="Auto" icon={ExchangeSvg} />
          <Acessory name="2 pessoas" icon={PeopleSvg} />
        </Acessories>

        <About>
          Este ?? autom??vel desportivo. Surgiu do lend??rio touro de lide indultado na pra??a Real Maestranza de Sevilla. ?? um bel??ssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}
