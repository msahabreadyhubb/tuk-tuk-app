import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";

import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import ThemedButton from "@/components/ThemedButton";

export default function TakePhoto() {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  // const navigation = useNavigation();
  const router = useRouter();
  const { company } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const startCamera = () => {
    setIsCameraOpen(true);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
      setIsCameraOpen(false);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setSubmitted(false);
    startCamera();
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Top logo */}
      <View style={styles.logoWrapper}>
        <Image source={company.logo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Background image */}
      <Image
        source={require("@/assets/images/bgonboarding.png")}
        style={styles.backgroundImg}
        resizeMode="cover"
      />

      <View style={styles.inner}>
        {photo ? (
          <>
            <Text style={styles.title}>Happy with your photo?</Text>
            <Image source={{ uri: photo }} style={styles.photoPreview} />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.outlineBtn} onPress={retakePhoto}>
                <Text style={styles.outlineText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={submitted ? undefined : handleSubmit}
              >
                <Text style={styles.primaryText}>
                  {submitted ? "Assign Score" : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Take a photo!</Text>
            <View style={styles.cameraWrapper}>
              {isCameraOpen ? (
                <Camera
                  type={CameraType.front}
                  ref={cameraRef}
                  style={styles.camera}
                />
              ) : (
                <Image
                  source={require("@/assets/images/TakePhoto.png")}
                  style={styles.placeholder}
                  resizeMode="contain"
                />
              )}
            </View>

            {isCameraOpen ? (
              <TouchableOpacity style={styles.primaryBtn} onPress={takePhoto}>
                <Text style={styles.primaryText}>Capture</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium, maiores.
                </Text>
                {/* <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={startCamera}
                >
                  <Text style={styles.primaryText}>Take Photo</Text>
                </TouchableOpacity> */}
                <ThemedButton title="Take Photo" onPress={startCamera} />
              </View>
            )}
          </>
        )}
      </View>
      

      {/* Next Activity Button */}

      <ThemedButton
        title="Next Activity"
        onPress={() => router.push("activityvideo")}
        style={styles.nextBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    position: "relative",
  },
  logoWrapper: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 40,
  },
  backgroundImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "60%",
    width: "100%",
    zIndex: 0,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },
  cameraWrapper: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  placeholder: {
    width: "100%",
    height: "100%",
  },
  photoPreview: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    marginBottom: 20,
  },
  descriptionWrapper: {
    alignItems: "center",
    marginTop: 12,
  },
  description: {
    color: "#64748b",
    marginBottom: 12,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginHorizontal: 8,
  },
  outlineBtn: {
    borderColor: "#94a3b8",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginHorizontal: 8,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
  outlineText: {
    color: "#1e293b",
  },
  nextBtn: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 10,
  },
});
