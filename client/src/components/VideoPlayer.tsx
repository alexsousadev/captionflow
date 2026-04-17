import "./VideoPlayer.css";
import Subtitles from "./Subtitles";

function embedSrc(videoId: string) {
  const q = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    color: "white",
  });
  return `https://www.youtube.com/embed/${videoId}?${q.toString()}`;
}

export default function YoutubeVideoPlayer({ videoId }: { videoId: string }) {
  const subtitlesData = [
      {
        "start": "00:00",
        "text": "Example subtitle 1"
      }, 
      {
        "start": "00:02",
        "text": "Example subtitle 2"
      }
    ]
  
  return (
    <div className="video-player-wrap">
      <div className="video-player-card">
        <div className="video-player-stage">
          <iframe
            src={embedSrc(videoId)}
            title="Vídeo do YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
      <Subtitles subtitlesData={subtitlesData} />
    </div>
  );
}
