import { KEYS } from "../constants/keys";

export type ForgotPasswordEvent = {
  key: KEYS.FORGOT_PASSWORD;
  data: {
    email: string;
    code: string;
  };
};
