import { Response } from "express";
import { SetCookiesProps } from "../types/utils";

const setCookies = (res: Response, payload: SetCookiesProps): void => {
  if (payload?.accessToken) {
    res.cookie("tour_management_access_token", payload.accessToken, {
      httpOnly: true,
      secure: false,
    });
  }
  if (payload?.refreshToken) {
    res.cookie("tour_management_refresh_token", payload.refreshToken, {
      httpOnly: true,
      secure: false,
    });
  }
};

export const cookies = {
  setCookies,
};
