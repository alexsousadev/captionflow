import { useState } from "react";
import { extractYoutubeVideoId } from "../utils/parser";
import YoutubeVideoPlayer from "./VideoPlayer";

function InitialPage() {
    const [videoUrl, setVideoUrl] = useState("");
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);

    const handleSelectVideo = () => {
        const parsedVideoId = extractYoutubeVideoId(videoUrl);

        if (!parsedVideoId) {
            setInputError("Insira uma URL ou ID valido do YouTube.");
            setSelectedVideoId(null);
            return;
        }

        setInputError(null);
        setSelectedVideoId(parsedVideoId);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Caption Flow</h1>
            <p>Selecione um vídeo para começar</p>
            <input
                type="text"
                placeholder="URL do vídeo"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
            />
            <button onClick={handleSelectVideo}>Selecionar</button>
            {inputError && <p>{inputError}</p>}
            {selectedVideoId && <YoutubeVideoPlayer videoId={selectedVideoId} />}
        </div>
    );
}

export default InitialPage;