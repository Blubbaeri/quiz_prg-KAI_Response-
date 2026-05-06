//App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./pages/Dashboard";
import FormLaporan from "./pages/Form_Laporan";
import ListRiwayat from "./pages/List_Riwayat";

const Stack = createNativeStackNavigator();

export default function MainApps() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Form Laporan" component={FormLaporan} />
        <Stack.Screen
          name="Riwayat Laporan"
          component={ListRiwayat}
          options={{ title: 'Riwayat Laporan' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}