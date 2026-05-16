export const convertTimeToSeconds = (time: string): number => {
  const parts = time.split(':').map(Number);
  
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  
  return parts[0] || 0;
};