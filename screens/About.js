import { View, Text, StyleSheet } from "react-native";

export default function About() {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>A propos</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          Plateforme de Permutation pour Enseignants Universitaires
        </Text>
        <View style={styles.text}>
          <Text style={styles.textText}>
            Cette plateforme est simplement un espace permettant aux professeurs
            universitaires de rechercher un partenaire pour une permutation.
            Elle se limite à cette fonctionnalité. Les enseignants peuvent
            rechercher des partenaires intéressés par un échange dans d'autres
            établissements d'enseignement supérieur. Le système facilite la
            recherche et la correspondance entre les enseignants ayant une
            volonté mutuelle d'échanger.
          </Text>
          <Text style={styles.textText}>
            La plateforme offre une interface conviviale et sécurisée aux
            enseignants pour communiquer et échanger les informations
            nécessaires. Les membres peuvent créer des profils personnels et
            renseigner des informations concernant leurs spécialités, les
            établissements et les informations de contact. Les enseignants
            peuvent consulter les profils des partenaires potentiels et entrer
            en contact avec eux pour discuter des détails de l'accord d'échange.
          </Text>
          <Text style={styles.textText}>
            En utilisant cette plateforme, les enseignants peuvent faciliter
            leur recherche de partenaires d'échange, économiser du temps et des
            efforts en évitant les communications individuelles et les
            recherches continues d'opportunités d'échange. Ce système est
            efficace et utile pour les enseignants souhaitant changer
            d'institution ou travailler dans un nouvel établissement pour
            élargir leur expérience académique.
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    margin: 30,
  },
  textText: {
    textAlign: "justify",
    marginBottom: 10,
  },
});
