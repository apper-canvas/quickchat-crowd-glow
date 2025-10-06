import { formatDistanceToNow, format, isToday, isYesterday, differenceInMinutes } from "date-fns";

export function formatMessageTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const minutesDiff = differenceInMinutes(now, date);

  if (minutesDiff < 1) {
    return "just now";
  }
  
  if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  }

  if (isToday(date)) {
    return format(date, "h:mm a");
  }

  if (isYesterday(date)) {
    return "yesterday";
  }

  return format(date, "MMM d");
}

export function formatChatTimestamp(timestamp) {
  const date = new Date(timestamp);
  
  if (isToday(date)) {
    return format(date, "h:mm a");
  }

  if (isYesterday(date)) {
    return `Yesterday ${format(date, "h:mm a")}`;
  }

  return format(date, "MMM d, h:mm a");
}