import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function StatusTimeLine({ id }) {
  const [status, setStatus] = useState("");
  const [lineWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    const statusRef = ref(db, `pedidos/${id}/statusPedido`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (status === "Pendente" || status === "Em preparo") {
      startLineAnimation();
    }
  }, [status]);

  const startLineAnimation = () => {
    lineWidth.setValue(0);
    Animated.loop(
      Animated.timing(lineWidth, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  };

  const statusList = ["Pendente", "Em preparo", "Concluído"];
  const statusIndex = statusList.indexOf(status);

  return (
    <View style={styles.timelineContainer}>
      {status !== "Cancelado" ? (
        statusList.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <Animated.View
              style={[
                styles.timelineLine,
                {
                  backgroundColor: status === "Concluído" || index <= statusIndex
                    ? "#FF9431"
                    : "#ccc",
                  width: status === "Concluído" || index < statusIndex
                    ? "190%"
                    : index === statusIndex
                    ? lineWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "190%"],
                      })
                    : "190%",
                },
              ]}
            />
            <Text
              style={[
                styles.timelineText,
                { color: index <= statusIndex ? "#FF9431" : "#aaa" },
              ]}
            >
              {item === "Em preparo" ? "Preparo" : item}
            </Text>
          </View>
        ))
      ) : (
        <View style={styles.cancelledContainer}>
          <View style={styles.fullRedBar} />
          <Text style={styles.cancelledText}>Cancelado</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timelineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    gap: 60,
    marginBottom: 30,
    position: "relative",
  },
  timelineItem: {
    alignItems: "center",
    position: "relative",
    width: 60,
  },
  timelineLine: {
    position: "absolute",
    top: -12,
    left: "50%",
    height: 4,
    borderRadius: 2,
    transform: [{ translateX: -60 }],
  },
  timelineText: {
    fontSize: 12,
    fontWeight: "500",
    zIndex: 1,
    position: "relative",
    marginTop: 6,
  },
  cancelledContainer: {
    alignItems: "center",
    width: "90%",
  },
  fullRedBar: {
    width: "100%",
    height: 4,
    backgroundColor: "red",
    borderRadius: 2,
  },
  cancelledText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
});
