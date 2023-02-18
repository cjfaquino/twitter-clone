import { Timestamp } from 'firebase/firestore';

const getTimeString = (
  timestamp: Timestamp | undefined,
  format?: string
): string => {
  if (!timestamp) return '';

  if (!format) {
    // format for TweetPage MainTweet & hover effect by title attribute
    return timestamp.toDate
      ? `${timestamp.toDate().toLocaleTimeString()} · ${timestamp
          .toDate()
          .toDateString()}`
      : `${new Date().toLocaleTimeString()} · ${new Date().toDateString()}`;
  }

  if (format === 'localeDate') {
    // format for TweetItems
    const pastDay = timestamp.toDate
      ? timestamp.toDate().toLocaleDateString()
      : `${new Date().toLocaleDateString()}`;

    const currentTime = new Date().getTime();
    const tweetTime = timestamp.toDate
      ? timestamp.toDate().getTime()
      : Date.now();

    const diff = currentTime - tweetTime;

    let msec = diff;
    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    // 24 hrs or over return full date
    if (hh >= 24) return pastDay;

    if (hh >= 1 && hh < 24) {
      // between 1 hr and 1 day
      return `${hh}h`;
    }

    if (mm >= 1 && hh < 1) {
      // between minute and hour
      return `${mm}m`;
    }

    if (mm < 1) {
      // under a minute
      return `${ss}s`;
    }
  }
  return '';
};

export default getTimeString;
