import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import ActivityLayout from "@/components/ActivityLayout";
import ThemedButton from "@/components/ThemedButton";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import zeroStar from "@/assets/images/zerostar.png";
import oneStar from "@/assets/images/onestar.png";
import twoStar from "@/assets/images/twostar.png";
import threeStar from "@/assets/images/threestar.png";

// Feedback data
const FEEDBACK_DATA = [
  { minScore: 50, image: threeStar, message: "Great job!" },
  { minScore: 25, image: twoStar, message: "Keep it going!" },
  { minScore: 10, image: oneStar, message: "Nice try!" },
  { minScore: 0, image: zeroStar, message: "Maybe next time!" },
];

// Example scores
const pointsEarned = 50;
const totalScore = 105;

// --- Curved Text Component ---
const CurvedText = ({ text = "" }) => {
  const { company } = useTheme();
  // console.log(company);
  const radius = 320; // radius of the arc
  const centerX = 200;
  const centerY = 150;

  const totalChars = text.length;
  const angleRange = 120; // degrees across the arc
  const startAngle = 210;

  return (
    <View style={styles.curvedTextContainer}>
      {text.split("").map((char, index) => {
        const angleDeg = startAngle + (index * angleRange) / (totalChars - 1);
        const angleRad = (angleDeg * Math.PI) / 180;

        const x = centerX + radius * Math.cos(angleRad);
        const y = centerY + radius * Math.sin(angleRad);

        return (
          <Text
            key={index}
            style={[
              styles.curvedChar,
              {
                left: x,
                top: y,
                transform: [{ rotate: `${angleDeg + 90}deg` }], // Rotating text to match the arc
                color: company.theme?.primary || "#0A3D62", // Using company theme color or default
              },
            ]}
          >
            {char}
          </Text>
        );
      })}
    </View>
  );
};

// --- Feedback Screen ---
export default class FeedbackScreen extends Component {
  getFeedback = () => {
    return FEEDBACK_DATA.find((feedback) => pointsEarned >= feedback.minScore);
  };

  render() {
    const { image, message } = this.getFeedback();

    return (
      <ActivityLayout>
        <View style={styles.container}>
          <CurvedText text={message} />
          <Image source={image} style={styles.starImage} resizeMode="contain" />
          <Text style={styles.pointsText}>You won {pointsEarned} points</Text>
          <Text style={styles.totalText}>
            Your total score is now {totalScore} points
          </Text>
        </View>
        <ThemedButton
          title="Continue"
          style={styles.nextButton}
          onPress={() => router.push("/")}
        />
      </ActivityLayout>
    );
  }
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 12,
  },
  starImage: {
    width: 520,
    height: 250,
    marginVertical: 20,
    marginTop: -140,
  },
  pointsText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#414264",
    marginTop: 8,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 24,
    color: "#A0A0AA",
    marginTop: 4,
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 10,
  },
  curvedTextContainer: {
    width: 400,
    height: 100,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  curvedChar: {
    position: "absolute",
    fontSize: 64,
    fontWeight: "900",
  },
});
