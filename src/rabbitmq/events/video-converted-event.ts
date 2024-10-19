import { KEYS } from "../constants/keys";

export type VideoConvertedEvent = {
  key: KEYS.VIDEO_CONVERTED;
  data: {
    id: string;
    audio: string;
  };
};
