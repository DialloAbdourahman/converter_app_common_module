import { KEYS } from "../constants/keys";

export type VideoUploadedEvent = {
  key: KEYS.VIDEO_UPLOADED;
  data: {
    id: string;
    video: string;
  };
};
