import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";

import ThemedButton from "@/components/ThemedButton"; // Imported ThemedButton
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

export default function QuizPage() {
  const [answer, setAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { company } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("@/assets/images/bgonboarding.png")}
        style={styles.backgroundImage}
      />

      {/* Next button */}
      <View style={styles.nextButtonContainer}>
        <ThemedButton
          onPress={() => {
            // Add your navigation logic here
            // navigation.navigate("ActivityDrawing");
            router.push("/activitydrawing");
          }}
          title="Next"
        />
      </View>

      {/* Logo in the top right corner */}
      <View style={styles.logoContainer}>
        <Image
          source={company.fulllogo} // Check this path!
          style={styles.logo}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* Main content */}
        <View style={styles.card}>
          <Text style={styles.heading}>Answer the question</Text>

          {/* Circular Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/activityframe1.png")}
              style={styles.circularImage}
            />
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>

          {/* Answer Input */}
          <TextInput
            style={[
              styles.textInput,
              { minHeight: 150, textAlignVertical: "top" },
            ]}
            placeholder="Your answer goes here"
            multiline
            numberOfLines={8}
            value={answer}
            onChangeText={setAnswer}
          />

          {/* Submit / Assign Score Button */}
          <View style={styles.buttonContainer}>
            <ThemedButton
              onPress={() => setSubmitted(true)}
              title={submitted ? "Assign Score" : "Submit"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Light Gray background color
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
    zIndex: 1, // Ensure background image is behind other content
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
  contentContainer: {
    width: "90%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // ensure it overlaps correctly
    backgroundColor: "transparent", // Make this transparent
    zIndex: 2,
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  logo: {
    width: 96,
    height: 48,
    resizeMode: "contain",
  },
  card: {
    width: "100%",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151", // darkGray
    marginBottom: 16,
    textAlign: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  circularImage: {
    width: 180,
    height: 160,
    borderRadius: 90, // make image circular
    resizeMode: "contain",
  },
  subtitle: {
    textAlign: "center",
    color: "#374151", // darkGray
    marginBottom: 16,
  },
  textInput: {
    width: "100%",
    padding: 12,
    borderColor: "#ccc",
    backgroundColor: "white",

    borderRadius: 8,
    color: "#374151", // darkGray
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center", // Center the button inside the container
  },
  defaultButtonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#0f766e", // primaryDark color
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "auto", // Ensure button doesn't stretch to full width
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
