import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function Rechercher() {
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState(null);
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState(null);
  const [professeurs, setProfesseurs] = useState([]);
  const [professeursData, setProfesseursData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://thankful-rose-clam.cyclic.app/professeurs")
      .then((response) => {
        setProfesseurs(response.data);
        setProfesseursData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const specialites = useMemo(() => {
    const uniqueSpecialites = [
      ...new Set(professeurs.map((professeur) => professeur.specialite)),
    ];

    return uniqueSpecialites.map((specialite, index) => ({
      _id: index + 1,
      name: specialite,
    }));
  }, [professeurs]);

  const villesActuelles = useMemo(() => {
    const uniqueVillesActuelles = [
      ...new Set(
        professeurs.map((professeur) => professeur.villeFaculteActuelle)
      ),
    ];

    return uniqueVillesActuelles.map((villeActuelle, index) => ({
      _id: index + 1,
      name: villeActuelle,
    }));
  }, [professeurs]);

  const villesDesirees = useMemo(() => {
    const uniqueVillesDesirees = [
      ...new Set(
        professeurs.flatMap((professeur) => professeur.villeDesiree.split(";"))
      ),
    ];

    return uniqueVillesDesirees.map((villeDesiree, index) => ({
      _id: index + 1,
      name: villeDesiree,
    }));
  }, [professeurs]);

  const renderListItem = (item) => {
    return (
      <View style={styles.listItem}>
        <Text>
          <Text style={styles.bulletPoint}>• </Text>
          {item.nom} {item.prenom}
          {" ("}
          {item.email}
          {" | "}
          {item.tel}
          {" | "}
          {item.grade}
          {" - "}
          {item.specialite}
          {" - ("}
          {item.faculteActuelle}
          {" | "}
          {item.villeFaculteActuelle}
          {")---->"}
          {item.villeDesiree}
        </Text>
      </View>
    );
  };
  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };

  const handleReset = () => {
    setLoading(true);
    setSelectedSpecialite(null);
    setSelectedVilleActuelle(null);
    setSelectedVilleDesiree(null);
    setLoading(false);
  };

  const filteredProfesseurs = useMemo(() => {
    if (
      !selectedSpecialite &&
      !selectedVilleActuelle &&
      !selectedVilleDesiree
    ) {
      return professeurs;
    }
    return professeurs.filter((professeur) => {
      const matchSpecialite =
        !selectedSpecialite || professeur.specialite === selectedSpecialite;
      const matchVilleActuelle =
        !selectedVilleActuelle ||
        professeur.villeFaculteActuelle === selectedVilleActuelle;
      const matchVilleDesiree =
        !selectedVilleDesiree ||
        professeur.villeDesiree.split(";").includes(selectedVilleDesiree);

      return matchSpecialite && matchVilleActuelle && matchVilleDesiree;
    });
  }, [
    professeurs,
    selectedSpecialite,
    selectedVilleActuelle,
    selectedVilleDesiree,
  ]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rechercher</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Spécialité</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={specialites}
            search
            searchPlaceholder="Search"
            labelField="name"
            valueField="name"
            label="Dropdown"
            placeholder="Toutes les spécialités"
            value={selectedSpecialite}
            onChange={(item) => setSelectedSpecialite(item.name)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />
          <Text style={styles.text}>Ville Actuelle</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={villesActuelles}
            search
            searchPlaceholder="Search"
            labelField="name"
            valueField="name"
            label="Dropdown"
            placeholder="Toutes les villes"
            value={selectedVilleActuelle}
            onChange={(item) => setSelectedVilleActuelle(item.name)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />
          <Text style={styles.text}>Ville Désirée</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={villesDesirees}
            search
            searchPlaceholder="Search"
            labelField="name"
            valueField="name"
            label="Dropdown"
            placeholder="Toutes les villes"
            value={selectedVilleDesiree}
            onChange={(item) => setSelectedVilleDesiree(item.name)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Ionicons
              name="reload"
              style={styles.icon}
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>Réinitialiser</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>Résultats de la recherche</Text>
          {!professeursData ? (
            <ActivityIndicator size="large" color="#6364d5" />
          ) : (
            filteredProfesseurs.map((professeur) => (
              <View key={professeur._id}>{renderListItem(professeur)}</View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

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
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 5,
    padding: 5,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
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

  button: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: "#6364d5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  restaucontainer: {
    backgroundColor: "#fff",
  },
  text: {
    paddingTop: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  professeurContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  professeurName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  professeurInfo: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  bulletPoint: {
    marginRight: 5,
    fontSize: 12,
    color: "black",
  },
});
