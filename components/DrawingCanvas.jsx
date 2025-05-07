// DrawingBoard.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Canvas,
  Path,
  Skia,
  useValue,
  useTouchHandler,
} from "@shopify/react-native-skia";

const DrawingBoard = () => {
  const [mode, setMode] = useState("pen"); // "pen" | "eraser"
  const path = useValue(Skia.Path.Make());
  const color = mode === "pen" ? "black" : "white";

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      path.current.moveTo(x, y);
    },
    onActive: ({ x, y }) => {
      path.current.lineTo(x, y);
    },
  });

  const resetCanvas = () => {
    path.current = Skia.Path.Make();
  };

  const handleSubmit = () => {
    // Future implementation: convert canvas to image and upload
    console.log("Submit clicked");
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} onTouch={touchHandler}>
        <Path
          path={path}
          color={color}
          style="stroke"
          strokeWidth={mode === "pen" ? 4 : 10}
        />
      </Canvas>

      <View style={styles.toolRow}>
        <TouchableOpacity
          style={[styles.toolBtn, mode === "pen" && styles.activeTool]}
          onPress={() => setMode("pen")}
        >
          <Text style={mode === "pen" && styles.activeText}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolBtn, mode === "eraser" && styles.activeTool]}
          onPress={() => setMode("eraser")}
        >
          <Text style={mode === "eraser" && styles.activeText}>🧽</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.restartBtn} onPress={resetCanvas}>
          <Text>Restart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawingBoard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f8f9fc",
  },
  canvas: {
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  toolRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  toolBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  activeTool: {
    backgroundColor: "#1e3a8a",
  },
  activeText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  restartBtn: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 24,
    borderColor: "#94a3b8",
    borderWidth: 1,
  },
  submitBtn: {
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 24,
  },
  submitText: {
    color: "#fff",
  },
});
