import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Accueil from "../screens/Accueil";
import Rechercher from "../screens/Recherche";
import Combinaisons from "../screens/Combinaisons";
import Profil from "../screens/Profil";
import Login from "../screens/Login";
import About from "../screens/About";

const home = "Accueil";
const login = "Login";
const profil = "Profil";
const rechercher = "Rechercher";
const combinaison = "Combinaisons";
const about = "A propos";
const logout = "Logout";

const Tab = createMaterialBottomTabNavigator();

const Navigation = ({ user }) => {
  const [screenText, setScreenText] = useState("Press a button!");
  const navigation = useNavigation();

  const changeText = (text) => {
    console.log(text + " has been pressed!");
    setScreenText(text);
  };

  return (
    <Tab.Navigator
      initialRouteName={home}
      barStyle={{ height: 80, backgroundColor: "#6364d5" }}
      screenOptions={({ route }) => ({
        tabBarColor: "#6364d5",
        tabBarIcon: () => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = "home";
          } else if (rn === profil) {
            iconName = "person";
          } else if (rn === rechercher) {
            iconName = "search";
          } else if (rn === combinaison) {
            iconName = "git-compare";
          } else if (rn === about) {
            iconName = "information-circle-outline";
          } else if (rn === logout) {
            iconName = "log-out-outline";
          }

          return <Ionicons name={iconName} size={25} color="white" />;
        },
      })}
    >
      <Tab.Screen name={home} component={Accueil} />
      <Tab.Screen name={profil}>{() => <Profil user={user} />}</Tab.Screen>
      <Tab.Screen name={rechercher} component={Rechercher} />
      <Tab.Screen name={combinaison} component={Combinaisons} />
      <Tab.Screen name={about} component={About} />
      <Tab.Screen
        name="Logout"
        component={Login}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.replace("Login");
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#3962FF",
    alignItems: "center",
  },
  NavContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 20,
  },
  NavBar: {
    flexDirection: "row",
    backgroundColor: "#eee",
    width: "90%",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },
  IconBehave: {
    padding: 14,
  },
});
