import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from "styled-components";
import { StatusBar } from 'react-native';

import { AppRoutes } from "./src/routes/app.routes";
import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';
import theme from "./src/global/styles/theme";

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  )
}
