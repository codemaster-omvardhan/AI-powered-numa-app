import { ImageSourcePropType } from "react-native";

interface Session {
    id: number;
    title: string;
    description: string;
    image: ImageSourcePropType | undefined
}

export const sessions: Session[] = [
    {
        id: 1,
        title: "Forest Path",
        description: "Mindful walking through nature",
        image: require("@/assets/sessions/forest-path.png")
    },
    {
        id: 2,
        title: "Mountain View",
        description: "Grounding mountain meditation practise",
        image: require("@/assets/sessions/mountain-view.png")
    },
    {
        id: 3,
        title: "Ocean Waves",
        description: "Calming waves meditation session",
        image: require("@/assets/sessions/ocean-waves.png")
    },
    {
        id: 4,
        title: "Sunrise Sky",
        description: "Morning mindfulness practise",
        image: require("@/assets/sessions/sunrise-sky.png")
    },
    {
        id: 5,
        title: "Zen Stones",
        description: "Focused balanced meditation",
        image: require("@/assets/sessions/zen-stones.png")
    }
]