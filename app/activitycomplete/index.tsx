// app/ActivityPage.tsx
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import ScoreSetter from "@/components/ScoreSetter";
import { useTheme } from "@/context/ThemeContext";
import ThemedButton from "@/components/ThemedButton";
import { useRouter } from "expo-router";

export default function ActivityPage() {
  const [isActivityCompleted, setIsActivityCompleted] = useState(false);

  const { company } = useTheme();
  const router = useRouter();

  const handleActivityCompleted = () => {
    setIsActivityCompleted(true);
  };

  const handleCloseModal = () => {
    setIsActivityCompleted(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/bgonboarding.png")}
        style={styles.backgroundImage}
      />
      {/* Logo Top Right */}
      <Image
        source={company.fulllogo}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Get active!</Text>
        <Image
          source={require("@/assets/images/onboarding1.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Text>

        <ThemedButton
          title="Activity Completed"
          onPress={handleActivityCompleted}
        />
      </View>

      {/* Next Button */}
      {/* <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("ActivityVideo" as never)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
      <ThemedButton
        title="Next"
        style={styles.nextButton}
        onPress={() => router.push("feedback")}
      />

      {/* ScoreSetter Modal */}
      <ScoreSetter isVisible={isActivityCompleted} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0F3",
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
  logo: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  illustration: {
    width: Dimensions.get("window").width * 0.8,
    height: 200,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  completeButton: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 10,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
