import type { Request, Response } from "express";
import TranscriptService from "../services/transcript.service.js";


class AIController {
    async getTranscript(req: Request, res: Response) {

        try {
            const { url: youtubeLink } = req.body;

            if (!youtubeLink || typeof youtubeLink !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Youtube link is required',
                    error: 'Youtube link is required',
                });
            }

            const transcript = await TranscriptService.getTranscript(youtubeLink);

            return res.status(200).json({
                success: true,
                message: 'Transcript fetched successfully',
                data: transcript,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch transcript',
                error: error,
            });
        }
        
    }
}

export default new AIController();
