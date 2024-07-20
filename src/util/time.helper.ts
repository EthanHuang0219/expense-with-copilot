const TIME_ZONE = "Asia/Taipei";
// 用 toLocaleDateString 將 ISO dateTime 轉換成 locale dateString, format: yyyy-mm-dd
export const getDateString = (date: string) => {
  return new Date(date)
    .toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: TIME_ZONE,
    })
    .replace(/\//g, "-");
};
// 將 ISO dateTime 轉換成 timeString
export const getTimeString = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
};
