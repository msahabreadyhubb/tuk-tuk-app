import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CurvedText = ({ text = "" }) => {
  const radius = 100;
  const centerX = 0;
  const centerY = 0;
  const totalChars = text.length;
  const angleStep = 180 / (totalChars - 1); // Spread over 180°
  const startAngle = -90; // Start from left (-90°)

  return (
    <View style={styles.container}>
      {text.split("").map((char, index) => {
        const angleDeg = startAngle + index * angleStep;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = radius * Math.cos(angleRad);
        const y = radius * Math.sin(angleRad);

        return (
          <Text
            key={index}
            style={[
              styles.char,
              {
                left: centerX + x,
                top: centerY + y,
                transform: [{ rotate: `${angleDeg + 90}deg` }],
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

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  char: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A3D62",
  },
});

export default CurvedText;
