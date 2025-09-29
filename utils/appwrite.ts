
if(!process.env.EXPO_PUBLIC_APPWRITE_APP_ID) {
    throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not defined");
}

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_APP_ID;
const BUNDLE_ID = "dev.numa.app";
const DB_ID = "68d81396000f512dfba4"
const SESSIONS_COLLECTION_ID = "test"; //68d81396000f512dfba5


const appwriteConfig = {
    endpoint: 'https://fra.cloud.appwrite.io/v1', // Appwrite Endpoint
    projectId: PROJECT_ID,
    bundleId: BUNDLE_ID,
    databaseId: DB_ID,
    tables: {
        sessions: SESSIONS_COLLECTION_ID, //Sessions Table ID
    },
}

const client = new Client()
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform);

const databases = new Databases(client);

// Import Models from Appwrite SDK
import { Models } from 'appwrite';

export { appwriteConfig, client, databases };
export interface Session extends Models.Document {
    $createdAt: string | number | Date;
    user_id: string;
    status: "in-progress";
    conv_id: string;
    tokens?: number;
    call_duration_secs?: number;
    transcript?: string;
    call_summary_title?: string;
}