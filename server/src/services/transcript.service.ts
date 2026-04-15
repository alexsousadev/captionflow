import type { GoogleGenAI } from '@google/genai';
import aiConfig from '../config/ai.config.js';
import envLoaderService from './env-loader.service.js';

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
          });

        return response?.text ?? '';
    }
}

export default TranscriptService.getInstance();