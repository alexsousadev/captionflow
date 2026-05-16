import { useRef } from "react";
import "./VideoPlayer.css";
import Subtitles from "./Subtitles";
import { convertTimeToSeconds } from "../utils/converter";

function embedSrc(videoId: string) {
  const q = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    color: "white",
    enablejsapi: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${q.toString()}`;
}

export default function YoutubeVideoPlayer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const subtitlesData = [
    {
      "start": "00:00",
      "text": "Example subtitle 1"
    },
    {
      "start": "00:02",
      "text": "Example subtitle 2"
    }
  ];

  const handleSeek = (timeStr: string) => {
    const seconds = convertTimeToSeconds(timeStr);

    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'seekTo', args: [seconds, true] }),
      '*'
    );
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      '*'
    );
  };

  return (
    <div className="video-player-wrap">
      <div className="video-player-card">
        <div className="video-player-stage">
          <iframe
            ref={iframeRef}
            src={embedSrc(videoId)}
            title="Vídeo do YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
      <Subtitles subtitlesData={subtitlesData} onSeek={handleSeek} />
    </div>
  );
}
