import { KEYS } from "../constants/keys";

export type VideoNotConvertedEvent = {
  key: KEYS.VIDEO_NOT_CONVERTED;
  data: {
    id: string;
  };
};
