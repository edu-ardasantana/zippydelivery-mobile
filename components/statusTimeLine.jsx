import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from "../firebase";

export default function StatusTimeLine({ id }) {
  const [status, setStatus] = useState(""); 
  const [lineWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    const statusRef = ref(db, `pedidos/${id}/statusPedido`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const newStatus = snapshot.val();
        setStatus(newStatus); 
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (status === "Pendente" || status === "Em preparo" || status === "Concluído") {
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
      {statusList.map((item, index) => (
        <View key={index} style={styles.timelineItem}>
          <Animated.View
            style={[
              styles.timelineLine,
              index <= statusIndex ? styles.timelineActive : styles.timelineInactive,
              {
                width: index === statusIndex
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
              index <= statusIndex ? styles.timelineTextActive : styles.timelineTextInactive,
            ]}
          >
            {item === "Em preparo" ? "Preparo" : item}
          </Text>
        </View>
      ))}
      {status === "Cancelado" && (
        <Text style={styles.cancelledStatus}>X</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    backgroundColor: "#FF9431",
    borderRadius: 2,
    transform: [{ translateX: -60 }], 
  },
  timelineActive: {
    backgroundColor: "#FF9431",
  },
  timelineInactive: {
    backgroundColor: "#ccc",
  },
  timelineText: {
    fontSize: 12,
    fontWeight: "500",
    zIndex: 1,
    position: "relative",
    marginTop: 6,
  },
  timelineTextActive: {
    color: "#FF9431",
  },
  timelineTextInactive: {
    color: "#aaa",
  },
  cancelledStatus: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    right: 10,
  },
});
