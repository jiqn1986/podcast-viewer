export const msToTime = (duration: number) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    const hoursString = (hours < 10) ? "0" + hours : hours;
    const minutesString = (minutes < 10) ? "0" + minutes : minutes;
    const secondsString = (seconds < 10) ? "0" + seconds : seconds;
    return hours > 0
        ? `${hoursString}:${minutesString}:${secondsString}`
        : `${minutesString}:${secondsString}`;
  }

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
}