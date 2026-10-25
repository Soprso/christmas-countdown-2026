import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

interface Flake {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  size: number;
}

export function Snowfall() {
  const flakesRef = useRef<Flake[]>([]);

  useEffect(() => {
    const count = 40;
    const flakes: Flake[] = [];
    for (let i = 0; i < count; i++) {
      const x = new Animated.Value(Math.random() * width);
      const y = new Animated.Value(-10 - Math.random() * height * 0.3);
      const opacity = new Animated.Value(0.4 + Math.random() * 0.5);
      const size = 2 + Math.random() * 4;
      flakes.push({ x, y, opacity, size });
    }
    flakesRef.current = flakes;

    flakes.forEach((flake) => {
      const duration = 8000 + Math.random() * 6000;
      const animate = () => {
        flake.y.setValue(-10);
        flake.x.setValue(Math.random() * width);
        Animated.timing(flake.y, {
          toValue: height + 20,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();
    });
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {flakesRef.current.map((flake, idx) => (
        <Animated.View
          key={idx}
          style={[
            styles.flake,
            {
              width: flake.size,
              height: flake.size,
              borderRadius: flake.size / 2,
              opacity: flake.opacity,
              transform: [{ translateX: flake.x }, { translateY: flake.y }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFill, zIndex: 0 },
  flake: { position: "absolute", backgroundColor: "#ffffff" },
});
