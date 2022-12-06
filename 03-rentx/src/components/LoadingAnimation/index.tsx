import LottieView from "lottie-react-native";
import { Container } from "./styles";

import carAnimation from "../../assets/car_animation.json";

export function LoadingAnimation() {
  return (
    <Container>
      <LottieView
        source={carAnimation}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  )
}