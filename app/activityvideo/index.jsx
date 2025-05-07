import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import ThemedButton from "@/components/ThemedButton";

export default function TakeVideo() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
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
    setVideoUri(null);
  };

  const startRecording = async () => {
    if (cameraRef) {
      setIsRecording(true);
      const video = await cameraRef.recordAsync();
      setVideoUri(video.uri);
      setIsRecording(false);
      setIsCameraOpen(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef && isRecording) {
      cameraRef.stopRecording();
    }
  };

  const retakeVideo = () => {
    setVideoUri(null);
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
        {videoUri ? (
          <>
            <Text style={styles.title}>Happy with your video?</Text>
            <Video
              source={{ uri: videoUri }}
              style={styles.videoPreview}
              useNativeControls
              resizeMode="contain"
              shouldPlay
              isLooping
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.outlineBtn} onPress={retakeVideo}>
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
            <Text style={styles.title}>Take a video!</Text>
            <View style={styles.cameraWrapper}>
              {isCameraOpen ? (
                <Camera
                  ref={(ref) => setCameraRef(ref)}
                  type={Camera.Constants.Type.front}
                  style={styles.camera}
                />
              ) : (
                <Image
                  source={require("@/assets/images/TakeVideo.png")}
                  style={styles.placeholder}
                  resizeMode="contain"
                />
              )}
            </View>

            {isCameraOpen ? (
              isRecording ? (
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={stopRecording}
                >
                  <Text style={styles.primaryText}>Stop Recording</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={startRecording}
                >
                  <Text style={styles.primaryText}>Start Recording</Text>
                </TouchableOpacity>
              )
            ) : (
              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium, maiores.
                </Text>
                <ThemedButton title="Take Video" onPress={startCamera} />
              </View>
            )}
          </>
        )}
      </View>

      {/* Next Activity Button */}
      <ThemedButton
        title="Next Activity"
        onPress={() => router.push("activitycomplete")}
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
  videoPreview: {
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
