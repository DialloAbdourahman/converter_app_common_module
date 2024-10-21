import { KEYS } from "../constants/keys";

export type NotificationVideoNotConvertedEvent = {
  key: KEYS.NOTIFICATION_VIDEO_NOT_CONVERTED;
  data: {
    resourceId: string;
  };
};
