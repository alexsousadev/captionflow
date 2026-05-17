import { type GoogleGenAI, Type } from '@google/genai';
import aiConfig from '../config/ai.config.js';
import envLoaderService from './env-loader.service.js';

const transcriptionSchema = {
    type: Type.OBJECT,
    properties: {
        info: {
            type: Type.OBJECT,
            properties: {
                t: { type: Type.STRING, description: "Title of the video" },
                l: { type: Type.STRING, description: "Language of the video" }
            },
            required: ["t", "l"]
        },
        caps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    h: { type: Type.STRING, description: "Section header or timestamp group title" },
                    f: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                s: { type: Type.STRING, description: "Timestamp in MM:SS format" },
                                t: { type: Type.STRING, description: "Text content for this segment" }
                            },
                            required: ["s", "t"]
                        }
                    }
                },
                required: ["h", "f"]
            }
        }
    },
    required: ["info", "caps"]
};

class TranscriptService {
    private static instance: TranscriptService;
    private client: GoogleGenAI;

    private constructor() {
        this.client = aiConfig.getClient();
    }

    static getInstance(): TranscriptService {
        if (!TranscriptService.instance) {
            TranscriptService.instance = new TranscriptService();
        }
        return TranscriptService.instance;
    }

    async getTranscript(videoUrl: string): Promise<string> {
        const prompt = envLoaderService.getEnv('YOUTUBE_LINK_PROMPT');

        if (!prompt || prompt.trim() === '') {
            throw new Error('TRANSCRIPTION_PROMPT is not set');
        }

        const contents = [
            {
              fileData: {
                fileUri: videoUrl,
              },
            },
            { text: prompt }
          ];
          
        const response = await this.client.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: transcriptionSchema,
            }
          });

        return response?.text ?? '';
    }
}

export default TranscriptService.getInstance();