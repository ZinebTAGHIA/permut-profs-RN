import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Navigation from "./navigation/Navigation";
import { useState } from "react";
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent('main', () => App);

export default function App() {
  const [user, setUser] = useState({});
  const Stack = createNativeStackNavigator();
  const globalScreenOptions = {
    // headerStyle: { backgroundColor: "#2C6BED" },
    headerStyle: { backgroundColor: "#212121" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={globalScreenOptions}
        >
          <Stack.Screen
            name="Login"
            options={{ headerShown: false, animation: "slide_from_right" }}
          >
            {(props) => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="App"
            options={{ headerShown: false, animation: "slide_from_right" }}
          >
            {(props) => <Navigation {...props} user={user} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
