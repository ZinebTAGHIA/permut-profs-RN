import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import WebView from "react-native-webview";

const Combinaisons = () => {
  const [loading, setLoading] = useState(true);
  const [getSpecialite, setSpecialite] = useState("Chimie");

  htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <title>Graphe des professeurs</title>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <style>
      .label {
        font-family: Arial, sans-serif;
        font-weight: 900;
      }
    </style>
  </head>
  <body>
    <div class="container text-center">
      <h1>Graphe des professeurs</h1>
      <div class="row">
        <div class="col-md-12">
          <svg id="graph" width="800" height="600">
            <defs>
              <marker
                id="end-arrow"
                viewBox="0 -5 10 10"
                refX="10"
                refY="0"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,-5L10,0L0,5" class="arrow-head" fill="gray" />
              </marker>
            </defs>
            <g id="graph-container"></g>
          </svg>
        </div>
      </div>
      <div>
        <div class="col-md-12">
          <div id="reciprocal-links">
            <h2>Combinaisons</h2>
          </div>
        </div>
      </div>
    </div>

    <script>
      function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      fetch("https://tiny-worm-nightgown.cyclic.app/professeurs")
        .then((response) => response.json())
        .then((data) => {
          var professeurs = data.filter(
            (prof) => prof.specialite === "${getSpecialite}"
          );
          console.log(professeurs);

          var liens = [];
          for (var i = 0; i < professeurs.length; i++) {
            var prof1 = professeurs[i];
            for (var j = 0; j < professeurs.length; j++) {
              if (i !== j) {
                var prof2 = professeurs[j];
                if (
                  prof1.villeDesiree === prof2.villeFaculteActuelle ||
                  prof1.villeDesiree.includes(prof2.villeFaculteActuelle)
                ) {
                  liens.push({
                    source: prof1,
                    target: prof2,
                  });
                }
              }
            }
          }

          // Créer le graphe avec d3.js
          var svg = d3.select("#graph");
          var width = parseInt(svg.attr("width"));
          var height = parseInt(svg.attr("height"));

          // Fonction de zoom
          var zoom = d3
            .zoom()
            .scaleExtent([0.1, 4]) // Définir les limites de zoom
            .on("zoom", zoomed);

          // Appliquer le zoom à l'élément SVG
          svg.call(zoom);

          // Créer le groupe pour les éléments du graphe
          var graph = svg.select("#graph-container");

          var simulation = d3
            .forceSimulation(professeurs)
            .force(
              "link",
              d3
                .forceLink(liens)
                .id(function (d) {
                  return d.id;
                })
                .distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2));

          var link = graph
            .selectAll("path")
            .data(liens)
            .enter()
            .append("path")
            .attr("stroke", "gray")
            .attr("stroke-width", 1)
            .attr("fill", "none")
            .attr("marker-end", "url(#end-arrow)");

          var node = graph
            .selectAll("circle")
            .data(professeurs)
            .enter()
            .append("circle")
            .attr("r", 8)
            .attr("fill", function (d) {
              return getRandomColor();
            })
            .call(
              d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );

          simulation.on("tick", function () {
            link.attr("d", function (d) {
              var dx = d.target.x - d.source.x;
              var dy = d.target.y - d.source.y;
              var dr = Math.sqrt(dx * dx + dy * dy);
              var theta = Math.atan2(dy, dx);
              var tx = d.source.x + (dr - 8) * Math.cos(theta);
              var ty = d.source.y + (dr - 8) * Math.sin(theta);
              return "M" + d.source.x + "," + d.source.y + "L" + tx + "," + ty;
            });

            node
              .attr("cx", function (d) {
                return d.x;
              })
              .attr("cy", function (d) {
                return d.y;
              });
          });

          node.on("click", function (event, d) {
            d3.selectAll(".label").remove();
            var label = d3
              .select(this.parentNode)
              .append("text")
              .attr("class", "label")
              .attr("x", d.x + 10) // Utiliser d.x au lieu de event.x
              .attr("y", d.y - 10) // Utiliser d.y au lieu de event.y
              .text(d.nom + " " + d.villeFaculteActuelle);
          });

          var reciprocalLinks = [];

          liens.forEach(function (d) {
            var reciprocalLink = liens.find(function (link) {
              return link.source === d.target && link.target === d.source;
            });

            if (
              reciprocalLink !== undefined &&
              reciprocalLinks.indexOf(reciprocalLink) === -1
            ) {
              reciprocalLinks.push(d);
            }
          });

          var reciprocalProfesseurs = reciprocalLinks.map(function (d) {
            return [d.source.nom, d.target.nom];
          });

          var reciprocalDiv = d3.select("#reciprocal-links");
          reciprocalDiv
            .selectAll("p")
            .data(reciprocalProfesseurs)
            .enter()
            .append("p")
            .text(function (d) {
              return d[0] + " <---> " + d[1];
            });

          function zoomed(event) {
            graph.attr("transform", event.transform);
          }

          function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }

          function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
          }

          function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }
        });
    </script>
  </body>
</html>

`;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Change the state after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout); // Clear the timeout if the component unmounts before the timeout expires
  }, []);

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Combinaisons</Text>
      </View>
      {loading && loading ? (
        <ActivityIndicator
          size="large"
          style={styles.indicator}
          color={"#6364d5"}
        />
      ) : null}
      <View style={{ marginLeft: 60 }}>
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
        />
      </View>
      <WebView source={{ html: htmlContent }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    alignContent: "center",
    justifyContent: "center",
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
  text: {
    color: "#0e0e21",
    fontWeight: "bold",
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
});
export default Combinaisons;
