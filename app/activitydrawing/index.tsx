import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ThemedButton from "@/components/ThemedButton";
import { useRouter } from "expo-router";
import DrawingCanvas from "@/components/DrawingCanvas";
import { useTheme } from "@/context/ThemeContext";

export default function DrawingFlowPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { company } = useTheme();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("@/assets/images/bgonboarding.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={company.fulllogo} style={styles.logo} />
        </View>

        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.heading}>Time to draw! </Text>
            <Image
              source={require("@/assets/images/activitydrawing.png")}
              style={styles.drawingImage}
            />
            <Text style={styles.subText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
            <ThemedButton title="Start drawing" onPress={() => setStep(2)} />
          </View>
        )}

        {step === 2 && (
          <>
            {/* Next Button */}
            <View style={styles.nextButtonContainer}>
              <ThemedButton
                title="Next"
                onPress={() => router.push("/activityphoto")}
              />
            </View>
            <DrawingCanvas />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0F3", // Light gray background
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
  },
  contentContainer: {
    width: "90%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flex: 1, // This will ensure that it takes up the full height
    zIndex: 1, // To ensure content is above the background image
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    right: 20, // Adjusted to ensure visibility
  },
  logo: {
    width: 140,
    height: 60,
    resizeMode: "contain",
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#414264", // Dark gray
    marginBottom: 16,
    textAlign: "center",
  },
  drawingImage: {
    width: 550,
    height: 400,
    resizeMode: "contain",
    marginBottom: 16,
  },
  subText: {
    color: "#414264", // Dark gray
    textAlign: "center",
    marginBottom: 36,
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
