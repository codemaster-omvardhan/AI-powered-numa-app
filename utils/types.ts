export interface TranscriptEntry {
    role: "user" | "assistant" ;
    time_in_call_seconds: number;
    message: string;
}

export interface ConversationMetadata {
    start_time_unix_seconds: number;
    call_duration_seconds: number;
    cost: number;
}

export interface Analysis {
    evaluation_criteria_results: Record<string, string>;
    data_collection_results: Record<string, string>;
    call_successful: "success" | "failure";
    transcript_summary: string;
    call_summary_title: string;
}

export interface ConversationResponse {
    agent_id: string;
    conversation_id: string;
    status: string;
    metadata: ConversationMetadata;
    has_audio: boolean;
    has_user_audio: boolean;
    has_response_audio: boolean;
    transcript: TranscriptEntry[];
    analysis: Analysis;
}