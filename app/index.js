import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
      <SafeAreaProvider>
        <View style={styles.container}>
          {/* L'image de fond */}
          <Image
              style={styles.imgBack}
              source={require("../assets/Rouen.png")}
              resizeMode="cover"
          />

          {/* Le contenu par-dessus */}
          <SafeAreaView style={styles.contentContainer}>

            {/* Titre Aspen */}
            <View style={styles.header}>
              <Text style={styles.title}>Aspen</Text>
            </View>

            {/* Textes du bas et Bouton */}
            <View style={styles.bottomSection}>
              <View style={styles.textWrapper}>
                <Text style={styles.subtitle}>Explore your</Text>
                <Text style={styles.cityText}>City</Text>
              </View>

              <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    pressed && { opacity: 0.8 }
                  ]}
                  // C'est ici que la redirection se fait
                  onPress={() => router.push("/home")}
              >
                <Text style={styles.buttonText}>GO !</Text>
              </Pressable>
            </View>

          </SafeAreaView>
        </View>
      </SafeAreaProvider>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imgBack: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 80,
    color: "white",
    fontWeight: "500",
    fontFamily: "Hiatus",
    letterSpacing: 2,
  },
  bottomSection: {
    width: "100%",
    gap: 20,
    marginBottom: 40,
  },
  textWrapper: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "400",
    marginBottom: -5,
  },
  cityText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "#176FF2",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  }
});