import { KEYS } from "../constants/keys";

export type UserCreatedEvent = {
  key: KEYS.USER_CREATED;
  data: {
    id: string;
    email: string;
    version: number;
  };
};
