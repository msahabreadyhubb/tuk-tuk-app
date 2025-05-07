import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedButton from "@/components/ThemedButton";
import { useTheme } from "@/context/ThemeContext";
import * as Updates from "expo-updates";

const ErrorModal = ({ visible, onClose }) => {
  const company = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Close Icon */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} color="#7f8c8d" />
          </TouchableOpacity>

          {/* Error Icon */}
          <MaterialIcons
            name="error-outline"
            size={64}
            color="#7f8c8d"
            style={styles.icon}
          />

          {/* Title */}
          <Text style={styles.title}>Something went wrong!</Text>

          {/* Description */}
          <Text style={styles.description}>
            Please reload, if the error persists - talk to your driver
          </Text>

          {/* Reload Button */}
          <ThemedButton
            title="Reload"
            onPress={() => Updates.reloadAsync()}
            style={{ backgroundColor: company.theme?.primaryDark }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: 320,
    alignItems: "center",
    elevation: 5,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2f3542",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#636e72",
    textAlign: "center",
    marginBottom: 24,
  },
});

export default ErrorModal;
