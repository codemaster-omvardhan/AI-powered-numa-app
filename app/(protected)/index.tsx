import { useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}
