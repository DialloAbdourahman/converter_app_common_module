import { KEYS } from "../constants/keys";

export type NotificationVideoConvertedEvent = {
  key: KEYS.NOTIFICATION_VIDEO_CONVERTED;
  data: {
    resourceId: string;
    email: string;
  };
};
