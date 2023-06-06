import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomBox from "react-native-customized-box";
import { MultiSelect } from "react-native-element-dropdown";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function Profil({ user }) {
  const [getFirstName, setFirstName] = useState(user.prenom);
  const [getLastName, setLastName] = useState(user.nom);
  const [getEmailId, setEmailId] = useState(user.email);
  const [getPassword, setPassword] = useState("");
  const [getEtablissement, setEtablissement] = useState(user.faculteActuelle);
  const [getTelephone, setTelephone] = useState(user.tel);
  const [getGrade, setGrade] = useState(user.grade);
  const [getSpecialite, setSpecialite] = useState(user.specialite);
  const [getVillesDesirees, setVillesDesirees] = useState(
    user.villeDesiree.split(";")
  );
  const [getVilleActuelle, setVilleActuelle] = useState(
    user.villeFaculteActuelle
  );

  const [updatedSuccessfull, setUpdatedSuccessfull] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [EtablissementError, setEtablissementError] = useState("");
  const [TelephoneError, setTelephoneError] = useState("");
  const navigation = useNavigation();

  const cities = [
    "Agadir",
    "Es-Semara",
    "Sidi Bennour",
    "El Kelaa des Sraghna",
    "Al Hoceima",
    "Assilah",
    "Azemmour",
    "Azrou",
    "Beni Mellal",
    "Benslimane",
    "Berkane",
    "Berrechid",
    "Boujdour",
    "Boulemane",
    "Casablanca",
    "Chefchaouen",
    "Dakhla",
    "El Hajeb",
    "El Jadida",
    "Errachidia",
    "Essaouira",
    "Fès",
    "Figuig",
    "Guelmim",
    "Ifrane",
    "Kénitra",
    "Khemisset",
    "Khenifra",
    "Khouribga",
    "Laâyoune",
    "Larache",
    "Marrakech",
    "Meknès",
    "Mohammédia",
    "Nador",
    "Ouarzazate",
    "Ouazzane",
    "Oujda",
    "Rabat",
    "Safi",
    "Salé",
    "Sefrou",
    "Settat",
    "Sidi Kacem",
    "Tan-Tan",
    "Tanger",
    "Taourirt",
    "Taroudant",
    "Taza",
    "Témara",
    "Tétouan",
    "Tiznit",
  ].sort();

  const citiesOptions = cities.map((city) => ({ value: city, label: city }));

  const specialities = [
    "Physique",
    "Espagnol",
    "Amazighe",
    "Informatique",
    "Droit privé",
    "Médecine",
    "Anglais",
    "Droit",
    "Chimie",
    "Mathématiques",
    "Science de Gestion",
    "Génie Civil",
    "Génie Électrique",
    "Génie Mécanique",
    "Génie Chimique",
    "Didactique des SVT",
    "Sciences Économiques",
    "Sciences Politiques",
    "Langues et Littératures",
    "Histoire",
    "Géographie",
    "Linguistique arabe",
    "Physiologie végétale ",
    "Psychologie",
    "Sociologie",
    "Philosophie",
    "Anthropologie",
    "Archéologie",
    "Sciences de l'environnement",
    "Ingénierie aérospatiale",
    "Gestion des affaires internationales",
    "Sciences de la communication",
    "Musique",
    "Théâtre",
    "Chimie minérale",
    "Chimie Physique",
    "Arts visuels",
    "Études religieuses",
    "Études de genre",
    "Science de la nutrition",
    "Éducation",
    "Relations publiques",
    "Traduction et interprétation",
    "Criminologie",
    "Études autochtones",
    "Études de développement",
    "Design graphique",
    "Design industriel",
    "Journalisme",
    "Bibliothéconomie et sciences de l'information",
    "Travail social",
    "Biologie",
    "Électronique, Instrumentation et Énergétique",
    "Biologie et biotechnologie agroalimentaire",
    "biotechnologie agroalimentaire",
    "Finance",
    "Géomatique et Hydrologie",
    "Génie industriel et maintenance",
    "Droit publique",
    "Logistique",
    "Géologie",
    "Biochimie",
    "Droit français",
    "Statistiques et probabilités",
    "Physique médicale",
    "Patrimoine",
    "Télécommunication",
    "Physiologie animale",
    "Géophysique",
    "Électronique, électrotechnique et automatique",
    "Génie de procédés",
  ].sort();

  const specialitiesOptions = specialities.map((speciality) => ({
    value: speciality,
    label: speciality,
  }));

  const grades = [
    "PES",
    "PH",
    "PA",
    "Ingénieur",
    "Administrateur",
    "Technicien",
    "PESQ",
  ];

  const gradesOptions = grades.map((grade) => ({ value: grade, label: grade }));

  const deleteFunction = () => {
    axios
      .delete(`https://thankful-rose-clam.cyclic.app/professeurs/${user.email}`)
      .then((response) => {
        console.log(response.data.message);
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };

  const updateFunction = () => {
    axios
      .put(
        `https://thankful-rose-clam.cyclic.app/professeurs/${user.email}`,
        getPassword === ""
          ? {
              nom: getLastName,
              prenom: getFirstName,
              tel: getTelephone,
              grade: getGrade,
              specialite: getSpecialite,
              faculteActuelle: getEtablissement,
              villeFaculteActuelle: getVilleActuelle,
              villeDesiree: getVillesDesirees.join(";"),
            }
          : {
              nom: getLastName,
              prenom: getFirstName,
              tel: getTelephone,
              grade: getGrade,
              specialite: getSpecialite,
              faculteActuelle: getEtablissement,
              villeFaculteActuelle: getVilleActuelle,
              villeDesiree: getVillesDesirees.join(";"),
              password: getPassword,
            }
      )
      .then((response) => {
        console.log(response.data);
        setUpdatedSuccessfull("Modifié avec succès");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <StatusBar barStyle="light-content" />
        <ScrollView style={{ paddingTop: 20, marginBottom: 60 }}>
          <View style={styles.container}>
            {/* <Image
              style={styles.myLogo}
              source={{
                uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
              }}
            />
            <Text style={styles.header}>Create Account for Free!</Text>
            <Image
              style={styles.registerImage}
              source={{
                uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/register.png",
              }}
            /> */}
            {getError ? (
              <View style={styles.errorCard}>
                <TouchableOpacity
                  style={styles.cross}
                  onPress={() => {
                    setError(false);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
                <Text style={styles.errorCardText}>{throwError}</Text>
              </View>
            ) : null}
            {/* Last Name */}
            <CustomBox
              placeholder={"Nom"}
              boxColor={"silver"}
              focusColor={"#e07964"}
              boxStyle={{ borderRadius: 10, borderWidth: 1 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Nom",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              requiredConfig={{
                text: <Text>{lastError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={getLastName}
              onChangeText={(value) => {
                setLastName(value);
                setError(false);
                setLastError("");
              }}
            />
            {/* First Name */}
            <CustomBox
              placeholder={"Prénom"}
              boxColor={"silver"}
              focusColor={"#e07964"}
              boxStyle={{ borderRadius: 10, borderWidth: 1 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Prénom",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              requiredConfig={{
                text: <Text>{firstError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={getFirstName}
              onChangeText={(value) => {
                setFirstName(value);
                setError(false);
                setFirstError("");
              }}
            />

            {/* Telephone */}
            <CustomBox
              placeholder={"Téléphone"}
              boxColor={"silver"}
              focusColor={"#e07964"}
              boxStyle={{ borderRadius: 10, borderWidth: 1 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Téléphone",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              requiredConfig={{
                text: <Text>{TelephoneError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={getTelephone}
              onChangeText={(value) => {
                setTelephone(value);
                setError(false);
                setTelephoneError("");
              }}
            />
            {/* Email Id */}
            <CustomBox
              placeholder={"Email"}
              boxColor={"silver"}
              focusColor={"#e07964"}
              type={"email"}
              boxStyle={{ borderRadius: 10, borderWidth: 1 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Email",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              requiredConfig={{
                text: <Text>{emailError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={user.email}
              onChangeText={(value) => {
                setEmailId(value);
                setError(false);
                setEmailError("");
              }}
            />
            {/* Password */}
            <CustomBox
              placeholder={"Password"}
              boxColor={"silver"}
              focusColor={"#e07964"}
              boxStyle={{ borderRadius: 10, borderWidth: 1 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
                overflow: "hidden",
              }}
              labelConfig={{
                text: "Password",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              toggle={true}
              requiredConfig={{
                text: <Text>{passwordError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={getPassword}
              onChangeText={(value) => {
                setPassword(value);
                setError(false);
                setPasswordError("");
              }}
            />
            {/* {grade} */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={gradesOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Grade"
              searchPlaceholder="Search..."
              value={getGrade}
              onChange={(item) => {
                setGrade(item.value);
              }}
            />

            {/* Etablissement */}
            <CustomBox
              placeholder={"Etablissement"}
              boxColor={"silver"}
              focusColor={"#e07964"}
              boxStyle={{ borderRadius: 10, borderWidth: 1 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Etablissement(FST,FS,EST,ENSA...)",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              requiredConfig={{
                text: <Text>{EtablissementError}</Text>,
                style: {
                  marginBottom: 10,
                },
              }}
              values={getEtablissement}
              onChangeText={(value) => {
                setEtablissement(value);
                setError(false);
                setEtablissementError("");
              }}
            />

            {/* {Spécialité} */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={specialitiesOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Spécialité"
              searchPlaceholder="Search..."
              value={getSpecialite}
              onChange={(item) => {
                setSpecialite(item.value);
              }}
            />

            {/* {ville actuelle} */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={citiesOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Ville actuelle"
              searchPlaceholder="Search..."
              value={getVilleActuelle}
              onChange={(item) => {
                setVilleActuelle(item.value);
              }}
            />

            {/* {Ville Desirees} */}

            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={citiesOptions}
              labelField="label"
              valueField="value"
              placeholder="Villes Désirées"
              searchPlaceholder="Search..."
              value={getVillesDesirees}
              onChange={(items) => {
                setVillesDesirees(items);
              }}
              selectedStyle={styles.selectedStyle}
            />

            <Text style={{ color: "green", fontSize: 20 }}>
              {updatedSuccessfull}
            </Text>
            {/* Modifier Button */}
            <TouchableOpacity
              style={styles.registerbtn}
              onPress={updateFunction}
            >
              <Text style={styles.registerBtnText}>Modifier</Text>
              {loading && loading ? (
                <ActivityIndicator style={styles.indicator} color={"white"} />
              ) : null}
            </TouchableOpacity>
            {/* Supprimer mon compte Button */}
            <TouchableOpacity
              style={styles.registerbtn}
              onPress={deleteFunction}
            >
              <Text style={styles.registerBtnText}>Supprimer mon compte</Text>
              {loading && loading ? (
                <ActivityIndicator style={styles.indicator} color={"white"} />
              ) : null}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
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
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: 300,
    marginBottom: 35,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  container: {
    marginTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  errorCard: {
    width: 300,
    height: 50,
    backgroundColor: "#de3138",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 40,
  },
  errorCardText: {
    paddingLeft: 15,
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  cross: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    left: 250,
    position: "relative",
  },
  registerImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    marginBottom: 20,
  },
  registerbtn: {
    marginTop: 10,
    backgroundColor: "#6364d5",
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
  },
  registerBtnText: {
    color: "white",
    fontSize: 22,
  },
});
