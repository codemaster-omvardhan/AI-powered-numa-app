import { sessions } from "@/utils/session";
import { useUser } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import * as Brightness from 'expo-brightness';
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import Gradient from "../gradient";

export default function SessionScreen() {
  const { user } = useUser();
  const { sessionId } = useLocalSearchParams();
  const session =
    sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0];

  const [isStarting, setIsStarting] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: ({ conversationId }) => {
      setConversationId(conversationId);
    },
    onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Received message:", message),
    onError: (error) => console.log("Conversation error:", error),
    onStatusChange: (prop) =>
      console.log("Conversation status changed:", prop.status),
    onCanSendFeedbackChange: (prop) =>
      console.log("Can sen feedback changed:", prop.canSendFeedback),
    onUnhandledClientToolCall: (params) =>
      console.log("Unhandled client tool call:", params),

    clientTools: {
      handleSetBrightness: async (parameters: unknown) => {
        const { brightnessValue } = parameters as { brightnessValue: number };
        console.log("☀️ Setting brightness to", { brightnessValue });

        const { status } = await Brightness.requestPermissionsAsync();
        if(status === "granted"){
          await Brightness.setSystemBrightnessAsync(brightnessValue);
          return brightnessValue;
        }
      }
    }
  });

  const startConversation = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);
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
    } finally {
      setIsStarting(false);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      console.log(e);
    }
  };

  const canStart = conversation.status === "disconnected" && !isStarting;
  const canEnd = conversation.status === "connected" ;

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
        <Button onPress={canStart ? startConversation : endConversation} 
        disabled = {!canStart && !canEnd}
        >
          {canStart ? "Start Conversation" : "End Conversation"}
        </Button>
      </View>
    </>
  );
}
