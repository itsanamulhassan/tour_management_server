import { Response } from "express";
import { RemoveCookiesProps, SetCookiesProps } from "../types/utils";

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

const removeCookies = (res: Response, payload: RemoveCookiesProps): void => {
  if (payload?.accessToken) {
    res.clearCookie("tour_management_access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }
  if (payload?.refreshToken) {
    res.clearCookie("tour_management_refresh_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }
};

export const cookies = {
  setCookies,
  removeCookies,
};
