import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedButton from "@/components/ThemedButton";
import { useTheme } from "@/context/ThemeContext";

type Slide = {
  id: number;
  paragraph: string;
  image: ImageSourcePropType;
};

const slides: Slide[] = [
  {
    id: 1,
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: require("@/assets/images/onboarding2.png"),
  },
  {
    id: 2,
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: require("@/assets/images/onboarding1.png"),
  },
  {
    id: 3,
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: require("@/assets/images/onboarding3.png"),
  },
];

export default function SlideshowScreen() {
  const router = useRouter();
  const { company } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const imageSize = isLandscape ? height * 0.5 : width * 0.7;

  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.push("/activityoptions");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/bgonboarding.png")}
        style={styles.bgImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.exitButton}>
          <Ionicons name="chevron-back" size={16} color="#333" />
          <Text style={styles.exitLabel}>
            {currentIndex === 0 ? "Exit" : "Back"}
          </Text>
        </TouchableOpacity>

        <View style={styles.logoRow}>
          <Image
            source={require("@/assets/icons/Vector.png")}
            style={styles.logo}
          />
          <View style={styles.divider} />
          <Image source={company.logo} style={styles.logo} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.paragraph}>{slides[currentIndex].paragraph}</Text>

        <Image
          source={slides[currentIndex].image}
          style={{
            width: imageSize,
            height: imageSize,
            marginBottom: 24,
          }}
          resizeMode="contain"
        />

        <ThemedButton
          title={isLastSlide ? "Start" : "Next"}
          onPress={handleNext}
        />

        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && {
                  backgroundColor: company.theme.primary,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  bgImage: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    zIndex: 0,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  exitButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  exitLabel: {
    color: "#333",
    marginLeft: 4,
    fontSize: 16,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  divider: {
    width: 3,
    height: 40,
    backgroundColor: "#aaa",
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    zIndex: 10,
  },
  paragraph: {
    textAlign: "center",
    color: "#333",
    fontSize: 18,
    marginBottom: 20,
  },
  dots: {
    flexDirection: "row",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
