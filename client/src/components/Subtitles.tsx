
type SubtitleItem = {
  start?: string;
  text: string;
};

type SubtitlesProps = {
  subtitlesData: SubtitleItem[];
};

export default function Subtitles({ subtitlesData }: SubtitlesProps) {
  return (
    <div className="subtitles-container" style={{textAlign: "left"}}>
      {subtitlesData.map((subtitle, idx) => {
        const time = subtitle.start ?? "00:00";
        return (
          <div className="subtitle-item" key={`${time}-${idx}`}>
            <div className="subtitle-time">
              {time} - {subtitle.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}