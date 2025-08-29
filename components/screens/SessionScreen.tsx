import { useUser } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import React from "react";
import { Button, Text, View } from "react-native";

export default function SessionScreen() {
  const { user } = useUser();

  const conversation = useConversation({
    onConnect: () => console.log("Connected to conversation"),
    onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Received message:", message),
    onError: (error) => console.log("Conversation error:", error),
    onStatusChange: (prop) =>
      console.log("Conversation status changed:", prop.status),
    onCanSendFeedbackChange: (prop) =>
      console.log("Can sen feedback changed:", prop.canSendFeedback),
    onUnhandledClientToolCall: (params) =>
      console.log("Unhandled client tool call:", params),
  });

  const startConversation = async () => {
    try {
      await conversation.startSession({
        agentId: process.env.EXPO_PUBLIC_AGENT_ID,
        dynamicVariables: {
          user_name: user?.username ?? "User",
          session_title: "test",
          session_description: "test",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>SessionScreen</Text>
      <Button title="Start Conversation" onPress={startConversation} />
      <Button
        title="End Conversation"
        onPress={endConversation}
        color={"red"}
      />
    </View>
  );
}
