import { sessions } from "@/utils/session";
import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Button from "./Button";

export default function ParallaxScrollView({ children }: PropsWithChildren) {
  const todaySession = sessions[Math.floor(Math.random() * sessions.length)];
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() =>
    // Only apply parallax effect when scrolling down
    // When scrolling up(positive offset), behave like a normal scroll view
    {
      const translateY =
        scrollOffset.value <= 0
          ? interpolate(scrollOffset.value, [-400, 0], [-400, 0])
          : 0;

      const scale =
        scrollOffset.value <= 0
          ? interpolate(scrollOffset.value, [-400, 0], [2, 1])
          : 1;

      return { transform: [{ translateY }, { scale }] };
    }
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            {
              height: 400,
              overflow: "hidden",
            },
            headerAnimatedStyle,
          ]}
        >
          <Image
            source={todaySession.image}
            style={{ width: "100%", height: 400 }}
          />
        </Animated.View>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={{ flex: 5 }} />
            <Text style={styles.headerSubtitle}>Featured Session</Text>
            <Text style={styles.headerTitle}>{todaySession.title}</Text>
            <Text style={styles.headerDescription}>
              {todaySession.description}
            </Text>
            <Button>Start Session</Button>
            <View style={{ flex: 1 }} />
          </View>
        </View>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.5,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  headerDescription: {
    fontSize: 16,
    color: "white",
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    height: 400,
    experimental_backgroundImage:
      "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
