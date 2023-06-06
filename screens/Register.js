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
import CustomBox from "react-native-customized-box";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function Register({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getEtablissement, setEtablissement] = useState("");
  const [getTelephone, setTelephone] = useState("");
  const [getGrade, setGrade] = useState("");
  const [getSpecialite, setSpecialite] = useState("");
  const [getVillesDesirees, setVillesDesirees] = useState([]);
  const [getVilleActuelle, setVilleActuelle] = useState("");

  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [EtablissementError, setEtablissementError] = useState("");
  const [TelephoneError, setTelephoneError] = useState("");
  const [updatedSuccessfull, setUpdatedSuccessfull] = useState("");

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

  const registerFunction = () => {
    setLoading(true);
    if (getFirstName === "") {
      setFirstError("*Ce champ est obligatoire");
    }
    if (getLastName === "") {
      setLastError("*Ce champ est obligatoire");
    }
    if (getEmail === "") {
      setEmailError("*Ce champ est obligatoire");
    }
    if (getPassword === "") {
      setPasswordError("*Ce champ est obligatoire");
    }

    if (
      getEmail !== "" &&
      getFirstName !== "" &&
      getLastName !== "" &&
      getPassword !== "" &&
      getPassword.length >= 6 &&
      getGrade !== "" &&
      getEtablissement !== "" &&
      getVilleActuelle !== "" &&
      getVillesDesirees !== "" &&
      getSpecialite !== ""
    ) {
      succesfullyCreateAccount();
    } else {
      setError(true);
      setLoading(false);
      setThrowError("Merci de remplir tous les champs");
    }
  };

  const succesfullyCreateAccount = () => {
    setLoading(true);
    axios
      .post("https://thankful-rose-clam.cyclic.app/professeurs", {
        nom: getLastName,
        prenom: getFirstName,
        tel: getTelephone,
        email: getEmail,
        grade: getGrade,
        specialite: getSpecialite,
        faculteActuelle: getEtablissement,
        villeFaculteActuelle: getVilleActuelle,
        villeDesiree: getVillesDesirees.join(";"),
        password: getPassword,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setUpdatedSuccessfull("Inscrit avec succès");
        // setEmail("");
        // setPassword("");
        // navigation.replace("Home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setThrowError("Sorry! Registering not successful");
        // setPassword("");
      });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={styles.container}>
          <Text style={styles.header}>Inscription</Text>
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
            placeholder={"Entrer votre nom"}
            boxColor={"#6364d5"}
            focusColor={"dodgerblue"}
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
            placeholder={"Entrer votre prénom"}
            boxColor={"#6364d5"}
            focusColor={"dodgerblue"}
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
            placeholder={"Entrer votre numéro de téléphone"}
            boxColor={"#6364d5"}
            focusColor={"dodgerblue"}
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
            placeholder={"Entrer votre adresse email"}
            boxColor={"#6364d5"}
            focusColor={"dodgerblue"}
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
            values={getEmail}
            onChangeText={(value) => {
              setEmail(value);
              setError(false);
              setEmailError("");
            }}
          />

          {/* Password */}
          <CustomBox
            placeholder={"Entrer votre mot de passe"}
            boxColor={"#6364d5"}
            focusColor={"dodgerblue"}
            boxStyle={{ borderRadius: 10, borderWidth: 1 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
              overflow: "hidden",
            }}
            labelConfig={{
              text: "Mot de passe",
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
          <View>
            <Text style={styles.text}>Grade</Text>
          </View>
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
            placeholder="Choississez votre Grade"
            searchPlaceholder="Search..."
            value={getGrade}
            onChange={(item) => {
              setGrade(item.value);
            }}
            //   renderLeftIcon={() => (
            //     <AntDesign
            //       style={styles.icon}
            //       color="black"
            //       name="Safety"
            //       size={20}
            //     />
            //   )}
          />

          {/* Etablissement */}
          <CustomBox
            placeholder={"Etablissement"}
            boxColor={"#6364d5"}
            focusColor={"dodgerblue"}
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
          <View>
            <Text style={styles.text}>Spécialité</Text>
          </View>
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
            placeholder="Choisissez une spécialité"
            searchPlaceholder="Search..."
            value={getSpecialite}
            onChange={(item) => {
              setSpecialite(item.value);
            }}
            //   renderLeftIcon={() => (
            //     <AntDesign
            //       style={styles.icon}
            //       color="black"
            //       name="Safety"
            //       size={20}
            //     />
            //   )}
          />

          {/* {ville actuelle} */}
          <View>
            <Text style={styles.text}>Ville Actuelle</Text>
          </View>
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
            placeholder="Choisissez une ville"
            searchPlaceholder="Search..."
            value={getVilleActuelle}
            onChange={(item) => {
              setVilleActuelle(item.value);
            }}
            //   renderLeftIcon={() => (
            //     <AntDesign
            //       style={styles.icon}
            //       color="black"
            //       name="Safety"
            //       size={20}
            //     />
            //   )}
          />

          {/* {Ville Desirees} */}
          <View>
            <Text style={styles.text}>Villes Désirées</Text>
          </View>
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
            placeholder="Choisissez les villes désirées"
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
          {/* Login Button */}
          <TouchableOpacity
            style={styles.registerbtn}
            onPress={registerFunction}
          >
            <Text style={styles.registerBtnText}>Inscription</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: 300,
    marginBottom: 35,
    backgroundColor: "white",
    borderBottomColor: "gray",
    marginTop: 10,
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
  header: {
    fontSize: 25,
    fontWeight: "900",
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
    borderRadius: 10,
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
  registerbtn: {
    marginTop: 10,
    backgroundColor: "#6364d5",
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
    flexDirection: "row",
  },
  registerBtnText: {
    color: "white",
    fontSize: 22,
  },
  text: {
    color: "#0e0e21",
    fontWeight: "bold",
  },
});
