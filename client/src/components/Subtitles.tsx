type SubtitleItem = {
  start?: string;
  text: string;
};

type SubtitlesProps = {
  subtitlesData: SubtitleItem[];
  onSeek?: (time: string) => void;
};

export default function Subtitles({ subtitlesData, onSeek }: SubtitlesProps) {
  return (
    <div className="subtitles-container" style={{textAlign: "left"}}>
      {subtitlesData.map((subtitle, idx) => {
        const time = subtitle.start ?? "00:00";
        return (
          <div 
            className="subtitle-item" 
            key={`${time}-${idx}`}
            onClick={() => onSeek?.(time)}
            style={{ 
              cursor: "pointer", 
              padding: "8px", 
              margin: "4px 0", 
              backgroundColor: "var(--code-bg, #2a2a2a)", 
              borderRadius: "4px",
              border: "1px solid var(--border, #444)",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--border, #444)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--code-bg, #2a2a2a)"}
          >
            <div className="subtitle-time">
              <span style={{ color: "var(--accent, #3b82f6)", fontWeight: "bold", marginRight: "8px" }}>{time}</span>
              <span>{subtitle.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}