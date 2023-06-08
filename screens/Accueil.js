import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Chart from "./Chart";
import Card from "./Card";
import axios from "axios";

const screenWidth = Dimensions.get("window").width - 35;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  legendLabel: "%l",
  legendFontSize: 12,
  legendPosition: "bottom",
};

export default function Profil() {
  const [numProfesseurs, setNumProfesseurs] = useState(0);
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://tiny-worm-nightgown.cyclic.app/professeurs")
      .then((response) => {
        setNumProfesseurs(response.data.length);
        setProfesseurs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://tiny-worm-nightgown.cyclic.app/professeurs"
  //     );
  //     const jsonData = await response.json();
  //     setNumProfesseurs(jsonData.length);
  //     setProfesseurs(jsonData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const generateSpecialitesData = (professeurs) => {
    const specialiteCount = {};
    professeurs.forEach((professeur) => {
      const specialite = professeur.specialite;
      if (specialiteCount[specialite]) {
        specialiteCount[specialite] += 1;
      } else {
        specialiteCount[specialite] = 1;
      }
    });

    const data = Object.keys(specialiteCount).map((specialite) => {
      const nombreProfesseurs = specialiteCount[specialite];
      if (nombreProfesseurs <= 14) {
        return null; // Exclude the specialty from the legend
      }

      return {
        name: specialite,
        number: nombreProfesseurs,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        legendLabel: specialite,
      };
    });

    return data.filter((item) => item !== null); // Filter out excluded specialties from the legend
  };

  const generateSpecialitesDataTop15 = (professeurs) => {
    const specialiteCount = {};
    professeurs.forEach((professeur) => {
      const specialite = professeur.specialite;
      if (specialiteCount[specialite]) {
        specialiteCount[specialite] += 1;
      } else {
        specialiteCount[specialite] = 1;
      }
    });

    const sortedSpecialites = Object.keys(specialiteCount).sort(
      (a, b) => specialiteCount[b] - specialiteCount[a]
    );
    const top15Specialites = sortedSpecialites.slice(0, 15);

    const data = top15Specialites.map((specialite) => {
      const nombreProfesseurs = specialiteCount[specialite];
      return {
        name: specialite,
        number: nombreProfesseurs,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        legendLabel: specialite,
      };
    });

    return data;
  };

  const generateVillesData = (professeurs) => {
    const villesCount = {};
    professeurs.forEach((professeur) => {
      const villeDesiree = professeur.villeDesiree.split(";");
      villeDesiree.forEach((ville) => {
        if (villesCount[ville]) {
          villesCount[ville] += 1;
        } else {
          villesCount[ville] = 1;
        }
      });
    });

    const data = Object.keys(villesCount).map((ville) => {
      const nombreProfesseurs = villesCount[ville];
      if (nombreProfesseurs <= 24) {
        return null; // Exclude the city from the legend
      }

      return {
        name: ville,
        number: nombreProfesseurs,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        legendLabel: ville,
      };
    });

    return data.filter((item) => item !== null); // Filter out excluded cities from the legend
  };

  const generateVillesDataTop15 = (professeurs) => {
    const villeCount = {};
    professeurs.forEach((professeur) => {
      const villeDesiree = professeur.villeDesiree.split(";");
      villeDesiree.forEach((ville) => {
        if (villeCount[ville]) {
          villeCount[ville] += 1;
        } else {
          villeCount[ville] = 1;
        }
      });
    });

    const sortedVilles = Object.keys(villeCount).sort(
      (a, b) => villeCount[b] - villeCount[a]
    );
    const top15Villes = sortedVilles.slice(0, 15);

    const data = top15Villes.map((ville) => {
      const nombreProfesseurs = villeCount[ville];
      return {
        name: ville,
        number: nombreProfesseurs,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        legendLabel: ville,
      };
    });

    return data;
  };

  const generateGradesData = (professeurs) => {
    const gradesCount = {};
    professeurs.forEach((professeur) => {
      const grade = professeur.grade;
      if (gradesCount[grade]) {
        gradesCount[grade] += 1;
      } else {
        gradesCount[grade] = 1;
      }
    });

    const data = Object.keys(gradesCount).map((grade) => ({
      name: grade,
      number: gradesCount[grade],
      color: getRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      legendLabel: grade,
    }));

    return data;
  };

  const generateGradesDataTop15 = (professeurs) => {
    const gradesCount = {};
    professeurs.forEach((professeur) => {
      const grade = professeur.grade;
      if (gradesCount[grade]) {
        gradesCount[grade] += 1;
      } else {
        gradesCount[grade] = 1;
      }
    });

    const sortedGrades = Object.keys(gradesCount).sort(
      (a, b) => gradesCount[b] - gradesCount[a]
    );

    const data = sortedGrades.map((grade) => {
      const nombreProfesseurs = gradesCount[grade];
      return {
        name: grade,
        number: nombreProfesseurs,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        legendLabel: grade,
      };
    });

    return data;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accueil</Text>
      </View>
      {loading && loading ? (
        <ActivityIndicator
          size="large"
          style={styles.indicator}
          color={"#6364d5"}
        />
      ) : null}
      <View style={styles.container}>
        <Card>
          <Text style={styles.title}>
            Nombre de professeurs inscrits : {numProfesseurs}
          </Text>
        </Card>
        <View
          style={{
            width: "100%",
            borderColor: "#6364d5",
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Card>
            <Text style={styles.title}>Nombre de profs par spécialité</Text>
            <PieChart
              data={generateSpecialitesData(professeurs)}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor={"number"}
              backgroundColor={"transparent"}
              center={[10, 20]}
              absolute
            />
          </Card>
        </View>

        <View
          style={{
            width: "100%",
            borderColor: "#6364d5",
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Card>
            <Text style={styles.title}>Villes les plus demandées</Text>
            <PieChart
              data={generateVillesData(professeurs)}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor={"number"}
              backgroundColor={"transparent"}
              center={[10, 20]}
              absolute
            />
          </Card>
        </View>
        <View
          style={{
            width: "100%",
            borderColor: "#6364d5",
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Card>
            <Text style={styles.title}>Nombre de profs par grade</Text>
            <PieChart
              data={generateGradesData(professeurs)}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor={"number"}
              backgroundColor={"transparent"}
              center={[10, 20]}
              absolute
            />
          </Card>
        </View>

        <Card>
          <Text style={styles.title}>
            Nombre de profs par spécialité (Top 15)
          </Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.columnHeader, { flex: 2 }]}>Spécialité</Text>
              <Text style={[styles.columnHeader, { flex: 1 }]}>Nombre</Text>
            </View>
            {generateSpecialitesDataTop15(professeurs).map((specialiteData) => (
              <View style={styles.row} key={specialiteData.name}>
                <Text style={[styles.cell, { flex: 2 }]}>
                  {specialiteData.name}
                </Text>
                <Text style={[styles.cell, { flex: 1 }]}>
                  {specialiteData.number}
                </Text>
              </View>
            ))}
          </View>
        </Card>
        <Card>
          <Text style={styles.title}>Villes les plus demandées (Top 15)</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.columnHeader, { flex: 2 }]}>Ville</Text>
              <Text style={[styles.columnHeader, { flex: 1 }]}>Nombre</Text>
            </View>
            {generateVillesDataTop15(professeurs).map((villeData) => (
              <View style={styles.row} key={villeData.name}>
                <Text style={[styles.cell, { flex: 2 }]}>{villeData.name}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>
                  {villeData.number}
                </Text>
              </View>
            ))}
          </View>
        </Card>
        <Card>
          <Text style={styles.title}>Nombre de profs par grade</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.columnHeader, { flex: 2 }]}>Ville</Text>
              <Text style={[styles.columnHeader, { flex: 1 }]}>Nombre</Text>
            </View>
            {generateGradesDataTop15(professeurs).map((gradeData) => (
              <View style={styles.row} key={gradeData.name}>
                <Text style={[styles.cell, { flex: 2 }]}>{gradeData.name}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>
                  {gradeData.number}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  table: {
    width: "100%",
    marginBottom: 16,
  },
  columnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  cell: {
    fontSize: 14,
  },
});
