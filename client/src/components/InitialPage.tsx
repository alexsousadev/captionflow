import { useState } from "react";
import { extractYoutubeVideoId } from "../utils/parser";
import YoutubeVideoPlayer from "./VideoPlayer";

function InitialPage() {
    const [videoUrl, setVideoUrl] = useState("");
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [subtitles, setSubtitles] = useState<Array<{start: string, text: string}>>([]);

    const handleSelectVideo = async () => {
        const parsedVideoId = extractYoutubeVideoId(videoUrl);

        if (!parsedVideoId) {
            setInputError("Insira uma URL ou ID valido do YouTube.");
            setSelectedVideoId(null);
            setSubtitles([]);
            return;
        }

        setInputError(null);
        setSelectedVideoId(parsedVideoId);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/transcriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: videoUrl })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success && result.data) {
                let parsed: any;
                if (typeof result.data === 'object') {
                    parsed = result.data;
                } else {
                    const jsonMatch = result.data.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        parsed = JSON.parse(jsonMatch[0]);
                    } else {
                        parsed = JSON.parse(result.data);
                    }
                }
                
                if (parsed && parsed.caps) {
                    const mappedSubtitles = parsed.caps.flatMap((cap: any) => cap.f.map((item: any) => ({ start: item.s, text: item.t })));
                    setSubtitles(mappedSubtitles);
                } else {
                    setInputError("Erro: A transcrição retornada pela IA não possui o formato esperado.");
                }
            } else {
                setInputError(result.message || "Erro ao obter transcrição.");
            }
        } catch (error) {
            console.error("Erro detalhado no processamento da transcrição:", error);
            setInputError("Erro ao obter a transcrição do vídeo. Verifique se o servidor está rodando.");
        } finally {
            setIsLoading(false);
        }
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
            <button onClick={handleSelectVideo} disabled={isLoading}>
                {isLoading ? "Carregando..." : "Selecionar"}
            </button>
            {inputError && <p>{inputError}</p>}
            {selectedVideoId && !isLoading && subtitles.length > 0 && (
                <YoutubeVideoPlayer videoId={selectedVideoId} subtitlesData={subtitles} />
            )}
        </div>
    );
}

export default InitialPage;