import { sessions } from "@/utils/session";
import { useUser } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import Gradient from "../gradient";

export default function SessionScreen() {
  const { user } = useUser();
  const { sessionId } = useLocalSearchParams();
  const session =
    sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0];

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
          session_title: session.title,
          session_description: session.description,
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
    <>
      <Gradient
        position="top"
        isSpeaking={
          conversation.status === "connected" ||
          conversation.status === "connecting"
        }
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          {session.title}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 500, opacity: 0.3 }}>
          {session.description}
        </Text>
        <Button onPress={startConversation}>Start Conversation</Button>
        <Button onPress={endConversation}>End Conversation</Button>
      </View>
    </>
  );
}
