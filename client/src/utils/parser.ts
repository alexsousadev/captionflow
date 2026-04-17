import { z } from "zod";


// Parse the YouTube video ID from the URL
const youtubeSchema = z.string().trim().transform((value)=> {
    const urlString = value.includes("://") ? value : `https://${value}`;
    const url = new URL(urlString);
    if(url.hostname.includes("youtube.com")){
        return url.searchParams.get("v") ?? null;
    }
    return null;
})

export function extractYoutubeVideoId(input: string): string | null {
    try {
        const parsedUrl = youtubeSchema.safeParse(input);

        if (!parsedUrl.success) {
            return null;
        }

        return parsedUrl.data;
        
    } catch {
        return null;
    }
}