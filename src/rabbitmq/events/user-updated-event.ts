import { KEYS } from "../constants/keys";

export type UserUpdateedEvent = {
  key: KEYS.USER_UPDATED;
  data: {
    id: string;
    email: string;
    fullname: string;
    version: number;
  };
};
