import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import Module1Screen from "../screens/Module1Screen";
import Module2Screen from "../screens/Module2Screen";
import Module3Screen from "../screens/Module3Screen";
import Module4Screen from "../screens/Module4Screen";
import Module5Screen from "../screens/Module5Screen";

const Stack = createNativeStackNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0F0F23",
    card: "#1A1A2E",
    text: "#F8FAFC",
    border: "rgba(255, 255, 255, 0.1)",
    primary: "#6366F1",
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1A1A2E",
          },
          headerTintColor: "#F8FAFC",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
            letterSpacing: 0.3,
          },
          headerShadowVisible: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#0F0F23",
          },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "🚀 Aprenda React Native",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Module1"
          component={Module1Screen}
          options={{ title: "🧩 Componentes & JSX" }}
        />
        <Stack.Screen
          name="Module2"
          component={Module2Screen}
          options={{ title: "🎣 Estado & Hooks" }}
        />
        <Stack.Screen
          name="Module3"
          component={Module3Screen}
          options={{ title: "🎨 Estilos" }}
        />
        <Stack.Screen
          name="Module4"
          component={Module4Screen}
          options={{ title: "🧭 Navegação" }}
        />
        <Stack.Screen
          name="Module5"
          component={Module5Screen}
          options={{ title: "📱 APIs Nativas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
