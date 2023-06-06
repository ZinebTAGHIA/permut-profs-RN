import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const Combinaisons = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Combinaisons</Text>
      </View>
      <WebView source={{ uri: "https://graph-permut.vercel.app/" }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#6364d5",
    padding: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  icon: {
    marginHorizontal: 5,
    padding: 5,
  },
  shadow: {
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default Combinaisons;
